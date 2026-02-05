"use client";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Video,
  Plus,
  FileText,
  Clock,
  ArrowRight,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const LatestInterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);

  return (
    <div className="my-8">
      {/* Header Section */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="font-bold text-3xl text-white mb-2">
            Previously Created Interviews
          </h2>
          <p className="text-gray-400 text-sm">
            Manage and review your interview sessions
          </p>
        </div>
        {interviewList?.length > 0 && (
          <Link href="/dashboard/create-interview">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg shadow-purple-500/20">
              <Plus className="w-4 h-4 mr-2" />
              New Interview
            </Button>
          </Link>
        )}
      </div>

      {/* Empty State */}
      {interviewList?.length == 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px] overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-x-10 -translate-y-10 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full translate-x-16 translate-y-16 blur-2xl"></div>

          {/* Icon with animation */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
              <Video className="h-12 w-12 text-purple-400" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 max-w-md relative z-10">
            <h3 className="text-2xl font-bold text-white">
              No Interviews Created Yet
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Start building your interview collection! Create your first
              AI-powered interview to streamline your hiring process.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-500 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span>AI-Powered Questions</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                <span>Video Recording</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Automated Scheduling</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                <span>Real-time Analysis</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 relative z-10">
            <Link href="/dashboard/create-interview">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25 rounded-full px-8 py-6 h-auto text-base"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Your First Interview
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* When interviews exist */}
      {interviewList?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewList.map((interview, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                    <Video className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {interview.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {interview.type || "Mock Interview"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">
                  <Clock className="h-3 w-3" />
                  <span>{interview.duration || "30m"}</span>
                </div>
              </div>

              <div className="my-4">
                <div className="w-full bg-white/5 rounded-full h-1.5 mb-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full w-[0%]"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Not Started</span>
                  <span>0%</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-gray-500">
                  Created {new Date().toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Link href={`/interview/${interview.mockId}/start`}>
                    <Button
                      size="sm"
                      className="bg-white/10 hover:bg-white/20 text-white h-8 border border-white/10"
                    >
                      Start
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestInterviewList;
