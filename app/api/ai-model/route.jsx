import { Question_PROMPT } from "@/Constant/dashbord";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    // Fixed: Added () after req.json
    const { jobPosition, jobDescription, duration, type } = await req.json();
    
    const FINAL_PROMT = Question_PROMPT
      .replace('{{jobTitle}}', jobPosition)
      .replace('{{jobDescription}}', jobDescription)
      .replace('{{duration}}', duration)
      .replace('{{type}}', type);
    
    console.log(FINAL_PROMT);
    
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });
    
    const completion = await openai.chat.completions.create({
      model: "google/gemma-3-4b-it:free",
      messages: [
        {
          role: "user",
          content: FINAL_PROMT,
        },
      ],
      
    });
    
    console.log(completion.choices[0].message);
    return NextResponse.json(completion.choices[0].message);
    
  } catch (e) {
    console.error("Error generating interview questions:", e);
    return NextResponse.json(
      { error: "Failed to generate interview questions", details: e.message },
      { status: 500 }
    );
  }
}