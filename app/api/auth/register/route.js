import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";
import { registerSchema, validate } from "@/lib/validations";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const validation = validate(registerSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 },
      );
    }

    const { name, email, password } = validation.data;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("voicevue");
    const usersCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      picture: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Return user without password
    return NextResponse.json(
      {
        success: true,
        user: {
          id: result.insertedId,
          name,
          email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
