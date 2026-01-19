"use client";

import {
  Phone,
  Timer,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Settings,
  Users,
  Calendar,
  Briefcase,
  Loader2,
} from "lucide-react";
import { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { Button } from "@/components/ui/button";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import Vapi from "@vapi-ai/web";
import AlertConformation from "./_components/AlertConformation";

const StartInterview = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [connectionState, setConnectionState] = useState("disconnected");
  const { interview_id } = useParams();

  // Mock context usage - replace with actual context
  // const interviewInfo = InterviewDataContext.interviewInfo;

  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapi = useMemo(
    () => new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY),
    [],
  );

  useEffect(() => {
    if (!interviewInfo && interview_id) {
      fetchInterviewDetails();
    }
  }, [interview_id]);

  const fetchInterviewDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("interview_id", interview_id)
        .single();

      if (error) throw error;
      if (data) {
        setInterviewInfo({
          ...data,
          interviewData: data,
          userName: "Candidate", // Fallback name
        });
      }
    } catch (err) {
      console.error("Error fetching interview:", err);
    }
  };

  useEffect(() => {
    vapi.on("call-start", () => {
      console.log("Call started");
      setConnectionState("connected");
      setIsRunning(true);
    });
    vapi.on("call-end", () => {
      console.log("Call ended");
      setConnectionState("disconnected");
      setIsRunning(false);
    });
    vapi.on("speech-start", () => console.log("AI is speaking"));
    vapi.on("speech-end", () => console.log("AI finished speaking"));
    vapi.on("error", (e) => {
      console.error("Vapi Error:", e);
      setConnectionState("error");
    });
    return () => vapi.removeAllListeners();
  }, [vapi]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Start timer when component mounts
  useEffect(() => {
    setIsRunning(true);
  }, []);

  // Format time display
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);
  const endCall = () => {
    // In real app: router.push('/interview/feedback')
    alert("Interview ended. Thank you!");
  };

  const getUserInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  const startCall = () => {
    if (connectionState === "connected" || connectionState === "connecting")
      return;

    const questions =
      (
        interviewInfo?.questionList ||
        interviewInfo?.interviewData?.questionList
      )
        ?.map((item) => item?.question)
        .join(", ") || "";

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName || "Candidate"}, I'm your AI recruiter. Ready for your ${interviewInfo?.jobPosition || "interview"}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "11labs",
        voiceId: "sarah",
      },
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `You are an expert technical interviewer for the position of ${interviewInfo?.jobPosition}.
Your task is to conduct a professional interview.
ASK THESE QUESTIONS ONE BY ONE:
${questions}

RULES:
1. Start with a friendly welcome.
2. Ask exactly one question at a time.
3. Wait for the candidate's answer before proceeding.
4. Provide very brief, encouraging feedback after each answer.
5. Keep your responses concise to ensure a smooth voice conversation.`,
          },
        ],
      },
    };

    console.log("Vapi Assistant Options:", assistantOptions);

    try {
      setConnectionState("connecting");
      vapi.start(assistantOptions);
    } catch (err) {
      console.error("Vapi Start Error:", err);
      setConnectionState("error");
    }
  };

  const stopInterview = () => {
    vapi.stop();
    console.log("Stop Vapiiiiii...");
    setIsCallActive(false);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  AI Interview Session
                </h1>
                <div className="flex items-center gap-4 mt-2 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm">
                      {interviewInfo?.jobPosition}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{interviewInfo?.type}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-600/20 px-4 py-2 rounded-lg">
                <Timer className="w-5 h-5 text-green-400" />
                <span className="text-xl font-mono text-green-400 font-bold">
                  {formatTime(time)}
                </span>
              </div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Recording</span>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* AI Recruiter */}
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="relative h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />

              {/* AI Avatar */}
              <div className="relative z-10 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <Users className="w-10 h-10 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  AI Recruiter
                </h3>
                <p className="text-blue-200">
                  {connectionState === "connected"
                    ? "Listening..."
                    : connectionState === "connecting"
                      ? "Connecting..."
                      : "Ready for Interview"}
                </p>

                {connectionState === "disconnected" && (
                  <Button
                    onClick={startCall}
                    className="mt-6 bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-6 rounded-2xl text-lg shadow-xl"
                  >
                    Start AI Interview
                  </Button>
                )}

                {/* Speaking indicator */}
                {connectionState === "connected" && (
                  <div className="flex items-center justify-center gap-1 mt-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-black/20">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">AI Recruiter</span>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${connectionState === "connected" ? "bg-green-400" : "bg-gray-400"}`}
                  />
                  <span
                    className={`text-sm ${connectionState === "connected" ? "text-green-400" : "text-gray-400"}`}
                  >
                    {connectionState.charAt(0).toUpperCase() +
                      connectionState.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* User Video */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="relative h-[400px] flex items-center justify-center">
              {isVideoOff ? (
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-bold text-white">
                      {getUserInitials(interviewInfo?.userName)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {interviewInfo?.userName || "Candidate"}
                  </h3>
                  <p className="text-gray-400">Camera is off</p>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-bold text-white">
                        {getUserInitials(interviewInfo?.userName)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {interviewInfo?.userName || "Candidate"}
                    </h3>
                    <p className="text-gray-400">You</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-black/20">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">
                  {interviewInfo?.userName || "You"}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm text-green-400">You</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-center gap-4">
            {/* Mute Button */}
            <Button
              onClick={toggleMute}
              className={`w-14 h-14 rounded-full transition-all duration-200 ${
                isMuted
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </Button>

            {/* Video Button */}
            <Button
              onClick={toggleVideo}
              className={`w-14 h-14 rounded-full transition-all duration-200 ${
                isVideoOff
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {isVideoOff ? (
                <VideoOff className="w-6 h-6 text-white" />
              ) : (
                <Video className="w-6 h-6 text-white" />
              )}
            </Button>

            {/* Settings Button */}
            <Button className="w-14 h-14 rounded-full bg-gray-600 hover:bg-gray-700 transition-all duration-200">
              <Settings className="w-6 h-6 text-white" />
            </Button>

            {/* End Call Button */}
            <AlertConformation stopInterview={() => stopInterview()}>
              <Button
                // onClick={endCall}
                className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 transition-all duration-200"
              >
                <PhoneOff className="w-6 h-6 text-white" />
              </Button>
            </AlertConformation>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isMuted ? "bg-red-400" : "bg-green-400"
                }`}
              />
              <span className="text-gray-300">
                {isMuted ? "Muted" : "Microphone On"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isVideoOff ? "bg-red-400" : "bg-green-400"
                }`}
              />
              <span className="text-gray-300">
                {isVideoOff ? "Camera Off" : "Camera On"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-gray-300">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
