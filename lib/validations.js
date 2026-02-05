import { z } from "zod";

// User registration schema
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// User login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Interview creation schema
export const interviewSchema = z.object({
  jobPosition: z.string().min(1, "Job position is required"),
  jobDescription: z.string().min(1, "Job description is required"),
  duration: z.string().min(1, "Duration is required"),
  type: z
    .union([
      z.string().min(1, "Interview type is required"),
      z.array(z.string()).min(1, "Interview type is required"),
    ])
    .transform((val) => (Array.isArray(val) ? val[0] : val)), // Convert array to string
  questionList: z
    .array(
      z.object({
        question: z.string(),
        type: z.string(),
      }),
    )
    .optional(),
});

// User update schema
export const updateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  picture: z.string().url().optional(),
});

/**
 * Validate data against a schema
 */
export function validate(schema, data) {
  try {
    return {
      success: true,
      data: schema.parse(data),
    };
  } catch (error) {
    console.error("Validation error:", error);

    // Handle Zod validation errors
    if (error.errors && Array.isArray(error.errors)) {
      return {
        success: false,
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };
    }

    // Handle other errors
    return {
      success: false,
      errors: [
        { field: "unknown", message: error.message || "Validation failed" },
      ],
    };
  }
}
