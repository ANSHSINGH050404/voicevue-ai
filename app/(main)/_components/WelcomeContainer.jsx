"use client";
import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";
import { Sparkles, Brain, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative bg-gradient-to-br from-purple-900/50 via-gray-900/50 to-blue-900/50 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl flex justify-between items-center mb-8 overflow-hidden shadow-2xl"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full -translate-x-20 -translate-y-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full translate-x-16 translate-y-16 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>

      {/* Content Section */}
      <div className="relative z-10 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-300 text-sm bg-white/5 w-fit px-3 py-1 rounded-full border border-white/5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{getCurrentDate()}</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {getCurrentGreeting()},{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {user?.name || "User"}
              </span>
              !
            </h1>
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-400" />
              <h2 className="text-xl text-gray-300 font-medium">
                Ready for AI-Driven Interviews?
              </h2>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="flex items-center space-x-6 mt-6">
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
            <span>Smart Analysis</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-1000"></div>
            <span>Seamless Experience</span>
          </div>
        </div>
      </div>

      {/* User Avatar Section */}
      <div className="relative z-10 flex flex-col items-center space-y-3 hidden md:flex">
        {user && (
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>

            {/* Avatar container */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-full p-1 backdrop-blur-sm border border-white/10">
              {user?.picture ? (
                <Image
                  src={user.picture}
                  alt="userAvatar"
                  width={80}
                  height={80}
                  className="rounded-full w-full h-full object-cover border-2 border-white/10"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center border-2 border-white/10">
                  <span className="text-2xl font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>

            {/* Status indicator */}
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full border border-black animate-pulse"></div>
            </div>
          </motion.div>
        )}

        {/* Quick action hint */}
        <div className="flex items-center space-x-1 text-gray-400 text-xs">
          <Sparkles className="h-3 w-3 text-purple-400" />
          <span>Ready to create</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeContainer;
