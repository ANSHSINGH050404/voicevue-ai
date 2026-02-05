"use client";

import {
  Phone,
  Video,
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const CreateOption = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 ">
      {/* AI Video Interview Option */}
      <Link href={"/dashboard/create-interview"} className="block">
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="group relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 cursor-pointer shadow-2xl shadow-purple-500/10 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full translate-y-32 -translate-x-32 blur-3xl group-hover:bg-pink-500/20 transition-all duration-500"></div>

          {/* Icon container */}
          <div className="relative z-10 mb-6">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-purple-500/30"
            >
              <Video className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                Create AI Interviews
              </h2>
              <div className="bg-purple-500/20 p-2 rounded-full group-hover:bg-purple-500/30 transition-colors">
                <ArrowRight className="w-5 h-5 text-purple-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Create intelligent AI-powered video interviews and schedule them
              seamlessly
            </p>

            {/* Features */}
            <div className="flex items-center space-x-4 pt-3">
              <div className="flex items-center space-x-1 text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <Calendar className="w-3 h-3 text-purple-400" />
                <span>Schedule</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <Sparkles className="w-3 h-3 text-pink-400" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>

          {/* Hover indicator */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </motion.div>
      </Link>

      {/* Phone Screening Option */}
      <Link href={"/dashboard/create-interview"} className="block">
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="group relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 cursor-pointer shadow-2xl shadow-blue-500/10 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full translate-y-32 -translate-x-32 blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>

          {/* Icon container */}
          <div className="relative z-10 mb-6">
            <motion.div
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg shadow-blue-500/30"
            >
              <Phone className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                Create Phone Screening
              </h2>
              <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium rounded-full">
                Coming Soon
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Set up automated phone screening calls with AI-driven conversation
              flow
            </p>

            {/* Features */}
            <div className="flex items-center space-x-4 pt-3">
              <div className="flex items-center space-x-1 text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <Phone className="w-3 h-3 text-blue-400" />
                <span>Voice AI</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>Automated</span>
              </div>
            </div>
          </div>

          {/* Disabled overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <span className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg text-white font-medium border border-white/10">
              Coming Soon
            </span>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default CreateOption;
