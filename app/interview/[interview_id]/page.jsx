"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { supabase } from "@/services/supabaseClient";
import {
  Info,
  Video,
  Clock,
  User,
  Code,
  Wifi,
  Camera,
  Mic,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";

const Interview = () => {
  const [name, setName] = useState("");
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);
  
  const { interview_id } = useParams();
  const router = useRouter();
  const { interviewInfo,setInterviewInfo } = useContext(InterviewDataContext) || {};

  useEffect(() => {
    if (interview_id) {
      getInterviewDetails();
    }
  }, [interview_id]);

  const getInterviewDetails = async () => {
    try {
      setLoading(true);
      setError("");
      
      const { data: interviews, error } = await supabase
        .from("interviews")
        .select("jobPosition,jobDescription,duration,type")
        .eq("interview_id", interview_id);

      if (error) {
        console.error("Supabase error:", error);
        setError("Failed to load interview details");
        return;
      }

      if (!interviews || interviews.length === 0) {
        setError("Interview not found");
        return;
      }

      setInterviewData(interviews[0]);
      
      // Update context if available
      if (setInterviewInfo) {
        setInterviewInfo(interviews[0]);
      }
    } catch (err) {
      console.error("Error fetching interview:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onJoinInterview = async () => {
    if (!name.trim()) return;
    
    try {
      setJoining(true);
      setError("");

      // Get full interview data
      const { data: interviews, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("interview_id", interview_id);

      if (error) {
        console.error("Error joining interview:", error);
        setError("Failed to join interview. Please try again.");
        return;
      }

      if (!interviews || interviews.length === 0) {
        setError("Interview not found");
        return;
      }

      // Store user name in context or localStorage
      if (setInterviewInfo) {
        setInterviewInfo({
          ...interviews[0],
          userName:name,
          interviewData:interviews[0],
        });
      }

      // Navigate to interview start page
      router.push(`/interview/${interview_id}/start`);
    } catch (err) {
      console.error("Error joining interview:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 max-w-md mx-auto text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center text-white">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Code className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">AI Interview Platform</h1>
            <p className="text-blue-100 text-lg">
              Ready to showcase your skills?
            </p>
          </div>

          {/* Main Content */}
          <div className="px-8 py-10">
            {/* Interview Details */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {interviewData?.jobPosition || "Position Interview"}
              </h2>
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
                <Clock className="w-5 h-5" />
                <span className="text-lg">
                  {interviewData?.duration || "30"} Minutes
                </span>
              </div>
              {interviewData?.type && (
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  {interviewData.type}
                </div>
              )}
            </div>

            {/* Name Input Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <User className="w-4 h-4 inline mr-2" />
                Enter Your Full Name
              </label>
              <Input
                placeholder="e.g. Ansh Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && name.trim()) {
                    onJoinInterview();
                  }
                }}
              />
            </div>

            {/* Pre-Interview Checklist */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3 mb-4">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Before You Begin
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <Wifi className="w-4 h-4 text-green-600" />
                  <span>Ensure you have a stable internet connection</span>
                </li>
                <li className="flex items-center gap-3">
                  <Camera className="w-4 h-4 text-green-600" />
                  <span>Check your camera and lighting setup</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mic className="w-4 h-4 text-green-600" />
                  <span>Test your microphone and audio</span>
                </li>
                <li className="flex items-center gap-3">
                  <Code className="w-4 h-4 text-green-600" />
                  <span>Have your coding environment ready</span>
                </li>
              </ul>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Join Button */}
            <div className="text-center">
              <Button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!name.trim() || joining}
                onClick={onJoinInterview}
              >
                {joining ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    <Video className="w-5 h-5 mr-2" />
                    Join Interview
                  </>
                )}
              </Button>
              {!name.trim() && (
                <p className="text-sm text-gray-500 mt-2">
                  Please enter your name to continue
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center text-sm text-gray-600">
            <p>Need help? Contact our support team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;