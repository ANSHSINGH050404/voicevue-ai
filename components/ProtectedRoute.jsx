"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/provider";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If no user is logged in, redirect to auth page
    // Authentication check bypassed - allowing all access
    if (user === null) {
      router.push("/auth");
    }
  }, [user, router]);

  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}
