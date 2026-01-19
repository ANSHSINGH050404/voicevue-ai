"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/Constant/dashbord";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, FileText, Briefcase, CheckCircle, AlertCircle } from "lucide-react";

const FormContainer = ({ onHandleInputChanges, GoToNext }) => {
  const [interviewType, setinterviewType] = useState([]);
  const [formData, setFormData] = useState({
    jobPosition: '',
    jobDescription: '',
    duration: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (interviewType) {
      onHandleInputChanges("type", interviewType);
    }
  }, [interviewType]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.jobPosition.trim()) {
      newErrors.jobPosition = 'Job position is required';
    }
    
    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
    }
    
    if (!formData.duration) {
      newErrors.duration = 'Interview duration is required';
    }
    
    if (interviewType.length === 0) {
      newErrors.interviewType = 'Please select at least one interview type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    onHandleInputChanges(field, value);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const AddInterviewType = (type) => {
    const data = interviewType.includes(type);
    if (!data) {
      setinterviewType((prev) => [...prev, type]);
    } else {
      const result = interviewType.filter((item) => item !== type);
      setinterviewType(result);
    }
    
    // Clear error when user selects a type
    if (errors.interviewType) {
      setErrors(prev => ({ ...prev, interviewType: '' }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      GoToNext();
    }
  };

  const isFormValid = formData.jobPosition && formData.jobDescription && formData.duration && interviewType.length > 0;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Create Interview Setup</h1>
        <p className="text-blue-100 text-sm">Configure your AI-powered interview session</p>
      </div>
      
      {/* Form Content */}
      <div className="p-8 space-y-8">
        {/* Job Position */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <label className="text-sm font-semibold text-gray-900">Job Position</label>
            <span className="text-red-500">*</span>
          </div>
          <div className="relative">
            <Input
              placeholder="e.g., Full Stack Developer, Data Scientist, Product Manager"
              className={`mt-1 h-12 border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                errors.jobPosition ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200'
              }`}
              onChange={(event) => handleInputChange("jobPosition", event.target.value)}
            />
            {errors.jobPosition && (
              <div className="flex items-center space-x-1 mt-2 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.jobPosition}</span>
              </div>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <label className="text-sm font-semibold text-gray-900">Job Description</label>
            <span className="text-red-500">*</span>
          </div>
          <div className="relative">
            <Textarea
              placeholder="Describe the role, responsibilities, required skills, and qualifications..."
              className={`h-32 border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none ${
                errors.jobDescription ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200'
              }`}
              onChange={(event) => handleInputChange("jobDescription", event.target.value)}
            />
            {errors.jobDescription && (
              <div className="flex items-center space-x-1 mt-2 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.jobDescription}</span>
              </div>
            )}
          </div>
        </div>

        {/* Interview Duration */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <label className="text-sm font-semibold text-gray-900">Interview Duration</label>
            <span className="text-red-500">*</span>
          </div>
          <Select
            onValueChange={(value) => handleInputChange("duration", value)}
          >
            <SelectTrigger className={`w-full h-12 border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
              errors.duration ? 'border-red-300' : 'border-gray-200'
            }`}>
              <SelectValue placeholder="Select interview duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5 Min">5 Minutes - Quick Screen</SelectItem>
              <SelectItem value="15 Min">15 Minutes - Brief Interview</SelectItem>
              <SelectItem value="30 Min">30 Minutes - Standard Interview</SelectItem>
              <SelectItem value="45 Min">45 Minutes - Detailed Interview</SelectItem>
              <SelectItem value="60 Min">60 Minutes - Comprehensive Interview</SelectItem>
            </SelectContent>
          </Select>
          {errors.duration && (
            <div className="flex items-center space-x-1 mt-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.duration}</span>
            </div>
          )}
        </div>

        {/* Interview Type */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <label className="text-sm font-semibold text-gray-900">Interview Type</label>
              <span className="text-red-500">*</span>
            </div>
            <span className="text-xs text-gray-500">
              {interviewType.length} selected
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {InterviewType.map((type, index) => (
              <div
                key={index}
                className={`group relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                  interviewType.includes(type.title)
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => AddInterviewType(type.title)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg transition-all duration-200 ${
                    interviewType.includes(type.title)
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                  }`}>
                    <type.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className={`font-medium text-sm ${
                      interviewType.includes(type.title) ? "text-blue-900" : "text-gray-900"
                    }`}>
                      {type.title}
                    </span>
                  </div>
                </div>
                
                {interviewType.includes(type.title) && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {errors.interviewType && (
            <div className="flex items-center space-x-1 mt-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.interviewType}</span>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Form Progress</span>
            <span className="text-sm text-gray-500">
              {[formData.jobPosition, formData.jobDescription, formData.duration, interviewType.length > 0].filter(Boolean).length}/4
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${([formData.jobPosition, formData.jobDescription, formData.duration, interviewType.length > 0].filter(Boolean).length / 4) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
              isFormValid
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Generate Questions
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;