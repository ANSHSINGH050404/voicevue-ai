import { Phone, Video, ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreateOption = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* AI Video Interview Option */}
      <Link 
        href={'/dashboard/create-interview'} 
        className="group relative bg-gradient-to-br from-white to-blue-50/50 border border-gray-200 rounded-3xl p-8 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
        
        {/* Icon container */}
        <div className="relative z-10 mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <Video className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
              Create AI Interviews
            </h2>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all duration-300" />
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            Create intelligent AI-powered video interviews and schedule them seamlessly
          </p>
          
          {/* Features */}
          <div className="flex items-center space-x-4 pt-3">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>Schedule</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
        
        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </Link>

      {/* Phone Screening Option */}

      <Link
      href={'/dashboard/create-interview'} 
      >
      <div className="group relative bg-gradient-to-br from-white to-green-50/50 border border-gray-200 rounded-3xl p-8 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
        
        {/* Icon container */}
        <div className="relative z-10 mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <Phone className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
              Create Phone Screening Call
            </h2>
            <div className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
              Coming Soon
            </div>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            Set up automated phone screening calls with AI-driven conversation flow
          </p>
          
          {/* Features */}
          <div className="flex items-center space-x-4 pt-3">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Phone className="w-3 h-3" />
              <span>Voice AI</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Automated</span>
            </div>
          </div>
        </div>
        
        {/* Disabled overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      </Link>
    </div>
  );
};

export default CreateOption;