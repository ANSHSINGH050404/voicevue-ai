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
    if (user === null) {
      router.push("/auth");
    }
  }, [user, router]);

  // Show loading state while checking authentication
  if (user === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg animate-pulse">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            VoiceVue-AI
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}
