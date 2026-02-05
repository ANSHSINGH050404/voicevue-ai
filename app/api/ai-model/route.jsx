import { Question_PROMPT } from "@/Constant/dashbord";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    // Fixed: Added () after req.json
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const FINAL_PROMT = Question_PROMPT.replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", duration)
      .replace("{{type}}", type);

    console.log("Prompt:", FINAL_PROMT);

    // Initialize Google Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content using Gemini
    const result = await model.generateContent(FINAL_PROMT);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini Response:", text);

    return NextResponse.json({
      role: "assistant",
      content: text,
    });
  } catch (e) {
    console.error("Error generating interview questions:", e);
    return NextResponse.json(
      { error: "Failed to generate interview questions", details: e.message },
      { status: 500 },
    );
  }
}
