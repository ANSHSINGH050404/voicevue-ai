import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";

const QuestionList = ({ formData,onCreateLink }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [saving, setSaving] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  // Enhanced manual extraction function as fallback
  const extractQuestionsManually = (text) => {
    const questions = [];
    console.log("Starting manual extraction from:", text.substring(0, 200));
    
    // Split by lines and clean up
    const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Look for different question patterns
      const patterns = [
        /^\d+\.\s*(.+)$/,  // 1. Question text
        /^Q\d+[:\.]?\s*(.+)$/,  // Q1: Question text
        /^Question\s*\d*[:\.]?\s*(.+)$/i,  // Question: text
        /^-\s*(.+)$/,  // - Question text
        /^\*\s*(.+)$/,  // * Question text
      ];
      
      for (const pattern of patterns) {
        const match = line.match(pattern);
        if (match) {
          const questionText = match[1].trim();
          if (questionText && questionText.length > 10 && questionText.endsWith('?')) {
            questions.push({
              question: questionText,
              type: "General"
            });
            break;
          }
        }
      }
      
      // Also look for lines that just contain questions (end with ?)
      if (line.endsWith('?') && line.length > 15 && !line.includes('JSON') && !line.includes('format')) {
        questions.push({
          question: line,
          type: "General"
        });
      }
    }
    
    console.log(`Manual extraction found ${questions.length} questions`);
    return questions;
  };

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });
      
      console.log("API Response:", result.data);
      
      // Parse the AI response to extract questions
      const responseContent = result.data.content;
      console.log("Raw AI Response:", responseContent);
      
      let parsedQuestions = [];
      
      // Clean the response content
      const cleanedContent = responseContent.trim();
      
      // Log the first 200 characters to see what we're getting
      console.log("First 200 chars of response:", cleanedContent.substring(0, 200));
      
      try {
        // Method 1: Try direct JSON parse first (only if it looks like JSON)
        if (cleanedContent.startsWith('{') || cleanedContent.startsWith('[')) {
          try {
            const parsed = JSON.parse(cleanedContent);
            parsedQuestions = parsed.interviewQuestions || (Array.isArray(parsed) ? parsed : []);
            console.log("Direct JSON parse successful");
          } catch (directParseError) {
            console.log("Direct JSON parse failed:", directParseError.message);
          }
        }
        
        // Method 2: Look for JSON object with interviewQuestions property
        if (!parsedQuestions.length) {
          const jsonObjectMatch = cleanedContent.match(/\{[\s\S]*?"interviewQuestions"[\s\S]*?\}/);
          if (jsonObjectMatch) {
            try {
              const parsed = JSON.parse(jsonObjectMatch[0]);
              parsedQuestions = parsed.interviewQuestions || [];
              console.log("JSON object match successful");
            } catch (objParseError) {
              console.log("JSON object parse failed:", objParseError.message);
            }
          }
        }
        
        // Method 3: Look for just the array part [{"question":...}]
        if (!parsedQuestions.length) {
          const arrayMatch = cleanedContent.match(/\[\s*\{[\s\S]*?"question"[\s\S]*?\}\s*\]/);
          if (arrayMatch) {
            try {
              parsedQuestions = JSON.parse(arrayMatch[0]);
              console.log("Array match successful");
            } catch (arrayParseError) {
              console.log("Array parse failed:", arrayParseError.message);
            }
          }
        }
        
        // Method 4: Look for interviewQuestions array assignment
        if (!parsedQuestions.length) {
          const jsonArrayMatch = cleanedContent.match(/interviewQuestions\s*=\s*(\[[\s\S]*?\])/);
          if (jsonArrayMatch) {
            try {
              parsedQuestions = JSON.parse(jsonArrayMatch[1]);
              console.log("Array assignment match successful");
            } catch (assignParseError) {
              console.log("Array assignment parse failed:", assignParseError.message);
            }
          }
        }
        
        // Method 5: Look for code blocks with JSON
        if (!parsedQuestions.length) {
          const codeBlockMatch = cleanedContent.match(/```(?:json)?\s*(\{[\s\S]*?\}|\[[\s\S]*?\])\s*```/);
          if (codeBlockMatch) {
            try {
              const parsed = JSON.parse(codeBlockMatch[1]);
              parsedQuestions = parsed.interviewQuestions || (Array.isArray(parsed) ? parsed : []);
              console.log("Code block match successful");
            } catch (codeParseError) {
              console.log("Code block parse failed:", codeParseError.message);
            }
          }
        }
        
      } catch (parseError) {
        console.error("Error parsing questions:", parseError);
        console.error("Response content:", responseContent);
      }
      
      // If all JSON parsing methods fail, try manual extraction
      if (!parsedQuestions.length) {
        console.log("All JSON parsing methods failed, trying manual extraction");
        parsedQuestions = extractQuestionsManually(responseContent);
      }
      
      // Validate questions format
      if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
        // Ensure each question has required properties
        const validQuestions = parsedQuestions.map((q, index) => ({
          question: q.question || q.text || `Question ${index + 1}`,
          type: q.type || "General"
        }));
        
        setQuestions(validQuestions);
        toast.success(`Generated ${validQuestions.length} interview questions!`);
      } else {
        throw new Error("No valid questions found in response");
      }
      
      setLoading(false);
      
    } catch (e) {
      console.error("API Error:", e);
      toast.error("Server error, Try Again!");
      setLoading(false);
    }
  };

 const onFinish = async () => {
  console.log("=== DEBUGGING SAVE PROCESS ===");
  
  if (!user?.email) {
    toast.error("Please login to save the interview");
    return;
  }

  if (questions.length === 0) {
    toast.error("No questions to save");
    return;
  }

  setSaving(true);
  let interview_id; // Declare outside try block
  
  try {
    interview_id = v4();
    console.log("Generated interview ID:", interview_id);
    
    const insertData = {
      ...formData,
      questionList: questions,
      userEmail: user.email,
      interview_id: interview_id,
      created_at: new Date().toISOString()
    };

    console.log("Inserting data...");
    
    // Remove the complex timeout logic, use simple insert
    const { data, error } = await supabase
      .from("interviews")
      .insert([insertData])
      .select();

    if (error) {
      console.error("Insert error:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log("Interview saved successfully:", data);
    toast.success("Interview questions saved successfully!");
    
    // Call the callback with the interview ID
    onCreateLink(interview_id);
    
  } catch (err) {
    console.error("Error saving interview:", err);
    toast.error(err.message || "Failed to save interview. Please try again.");
  } finally {
    setSaving(false);
  }
};

  return (
    <div className="w-full">
      {loading && (
        <div className="flex flex-col gap-4">
          <div className="p-5 rounded-2xl border flex gap-2 items-center bg-blue-50 border-gray-100">
            <Loader2Icon className="animate-spin h-5 w-5 text-blue-600" />
            <div>
              <h2 className="font-semibold text-blue-800">
                Generating Interview Questions
              </h2>
              <p className="text-sm text-blue-600">
                Our AI is crafting personalised questions based on your job
                position
              </p>
            </div>
          </div>
        </div>
      )}
      
      {!loading && questions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Interview Questions Generated ({questions.length} questions)
          </h3>
          <div className="space-y-3">
            {questions.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">
                    {item.type}
                  </span>
                  <span className="text-sm text-gray-400">Q{index + 1}</span>
                </div>
                <p className="text-gray-800">{item.question}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-6">
            <Button 
              onClick={onFinish} 
              disabled={saving}
              className="flex items-center gap-2"
            >
              {saving && <Loader2Icon className="animate-spin h-4 w-4" />}
              {saving ? "Saving..." : "Save & Finish"}
            </Button>
          </div>
        </div>
      )}
      
      {!loading && questions.length === 0 && (
        <div className="p-5 rounded-2xl border bg-yellow-50 border-yellow-200">
          <p className="text-yellow-800">
            No questions generated. Please try again.
          </p>
          <Button 
            onClick={GenerateQuestionList} 
            className="mt-3"
            variant="outline"
          >
            Retry
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionList;