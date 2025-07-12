import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  
  const { jobPosition, jobDescription, duration, type } = await req.json;
    

    try{
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",

    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "google/gemma-3-4b-it:free",

    messages: [
      {
        role: "user",

        content: "What is the meaning of life?",
      },
    ],
  });

  console.log(completion.choices[0].message);
  return NextResponse.json(completion.choices[0].message)
}
  catch(e){
    console.log(e);
    
    return NextResponse.json(e)
  }
}
