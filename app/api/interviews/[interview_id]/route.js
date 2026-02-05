import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const { interview_id } = await params;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("voicevue");
    const interviewsCollection = db.collection("interviews");

    // Find interview by interview_id
    const interview = await interviewsCollection.findOne({ interview_id });

    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      interview: {
        ...interview,
        _id: interview._id.toString(),
      },
    });
  } catch (error) {
    console.error("Get interview error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
