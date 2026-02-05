import { Question_PROMPT } from "@/Constant/dashbord";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Correct package name

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    // Cleanly replace placeholders
    const FINAL_PROMPT = Question_PROMPT.replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", duration)
      .replace("{{type}}", type);

    // Initialize Google Gemini AI with your API Key
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    
    // Use the correct model name (e.g., "gemini-1.5-flash" or "gemini-2.0-flash")
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Generate content
    const result = await model.generateContent(FINAL_PROMPT);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      role: "assistant",
      content: text,
    });
  } catch (e) {
    console.error("Error generating interview questions:", e);
    return NextResponse.json(
      { error: "Failed to generate interview questions", details: e.message },
      { status: 500 }
    );
  }
}