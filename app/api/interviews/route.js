import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import clientPromise from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { interviewSchema, validate } from "@/lib/validations";

export async function POST(request) {
  try {
    // Get token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    console.log("[Interview API] Token present:", !!token);

    if (!token) {
      console.error("[Interview API] No token found in cookies");
      return NextResponse.json(
        { error: "Unauthorized - Please login first" },
        { status: 401 },
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      console.error("[Interview API] Token verification failed");
      return NextResponse.json(
        { error: "Invalid token - Please login again" },
        { status: 401 },
      );
    }

    console.log("[Interview API] User authenticated:", decoded.email);

    const body = await request.json();
    console.log("[Interview API] Request body:", JSON.stringify(body, null, 2));

    // Validate input
    const validation = validate(interviewSchema, body);
    if (!validation.success) {
      console.error("[Interview API] Validation failed:", validation.errors);
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 },
      );
    }

    console.log("[Interview API] Validation passed");

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("voicevue");
    const interviewsCollection = db.collection("interviews");

    console.log("[Interview API] MongoDB connected");

    // Create interview
    const interviewData = {
      ...validation.data,
      userId: decoded.userId,
      userEmail: decoded.email,
      interview_id: body.interview_id, // UUID from frontend
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("[Interview API] Inserting interview data...");
    const result = await interviewsCollection.insertOne(interviewData);
    console.log(
      "[Interview API] Interview created successfully:",
      result.insertedId,
    );

    return NextResponse.json(
      {
        success: true,
        interview: {
          id: result.insertedId,
          interview_id: body.interview_id,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[Interview API] Error:", error);
    console.error("[Interview API] Error stack:", error.stack);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  try {
    // Get token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("voicevue");
    const interviewsCollection = db.collection("interviews");

    // Get all interviews for this user
    const interviews = await interviewsCollection
      .find({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      interviews: interviews.map((interview) => ({
        ...interview,
        _id: interview._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Get interviews error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
