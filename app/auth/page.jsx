"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import Image from "next/image";
import React from "react";
import { Loader2 } from "lucide-react";

const page = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const signWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        console.error("Auth error:", error.message);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Unexpected error during sign-in:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main login container */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-blue-500/10 p-8 border border-white/20">
          {/* Logo/Brand section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VoiceVue-AI
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              Intelligent voice analytics platform
            </p>
          </div>

          {/* Hero image */}
          <div className="mb-8">
            <div className="relative w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden">
              <Image
                src="/login.jpeg"
                alt="VoiceVue AI Dashboard"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Welcome text */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm">
              Sign in to access your voice analytics dashboard
            </p>
          </div>

          {/* Google sign-in button */}
          <div className="space-y-4">
            <Button
              onClick={signWithGoogle}
              disabled={isLoading}
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-xl font-medium shadow-sm transition-all duration-200 hover:shadow-md group disabled:opacity-70"
            >
              <div className="flex items-center justify-center space-x-3">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                <span>
                  {isLoading ? "Signing in..." : "Continue with Google"}
                </span>
              </div>
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-60 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default page;
