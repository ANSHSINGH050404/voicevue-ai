"use client";
import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";
import { Sparkles, Brain, Calendar, ArrowRight } from "lucide-react";

const WelcomeContainer = () => {
  const { user } = useUser();

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 rounded-3xl flex justify-between items-center mt-10 mx-10 overflow-hidden shadow-2xl">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-16 translate-y-16"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
      <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-1000"></div>

      {/* Content Section */}
      <div className="relative z-10 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{getCurrentDate()}</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white">
              {getCurrentGreeting()}, {user?.name || "User"}!
            </h1>
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-yellow-300" />
              <h2 className="text-xl text-white/90 font-medium">
                Ready for AI-Driven Interviews?
              </h2>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="flex items-center space-x-6 mt-6">
          <div className="flex items-center space-x-2 text-white/80 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center space-x-2 text-white/80 text-sm">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
            <span>Smart Analysis</span>
          </div>
          <div className="flex items-center space-x-2 text-white/80 text-sm">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
            <span>Seamless Experience</span>
          </div>
        </div>
      </div>

      {/* User Avatar Section */}
      <div className="relative z-10 flex flex-col items-center space-y-3">
        {user && (
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>

            {/* Avatar container */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-full p-1 backdrop-blur-sm">
              {user?.picture ? (
                <Image
                  src={user.picture}
                  alt="userAvatar"
                  width={80}
                  height={80}
                  className="rounded-full w-full h-full object-cover border-2 border-white/30"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-2 border-white/30">
                  <span className="text-2xl font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>

            {/* Status indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
        )}

        {/* Quick action hint */}
        <div className="flex items-center space-x-1 text-white/70 text-xs">
          <Sparkles className="h-3 w-3" />
          <span>Ready to create</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-6 right-6 text-white/10">
        <Sparkles
          className="h-8 w-8 animate-spin"
          style={{ animationDuration: "8s" }}
        />
      </div>

      <div className="absolute bottom-6 left-6 text-white/10">
        <Brain
          className="h-6 w-6 animate-bounce"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </div>
  );
};

export default WelcomeContainer;
