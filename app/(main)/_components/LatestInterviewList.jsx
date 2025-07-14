'use client'
import { Button } from '@/components/ui/button'
import { Camera, Video, Plus, FileText, Clock, ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import Link from 'next/link'

const LatestInterviewList = () => {
    const [interviewList, setInterviewList] = useState([])
    
    return (
        <div className='my-8'>
            {/* Header Section */}
            <div className="mb-6">
                <h2 className='font-bold text-3xl text-gray-900 mb-2'>
                    Previously Created Interviews
                </h2>
                <p className="text-gray-600 text-sm">
                    Manage and review your interview sessions
                </p>
            </div>
            
            {/* Empty State */}
            {interviewList?.length == 0 && (
                <div className='relative bg-gradient-to-br from-gray-50 to-blue-50/30 border-2 border-dashed border-gray-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px] overflow-hidden'>
                    {/* Background decorations */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-blue-100 rounded-full -translate-x-10 -translate-y-10 opacity-30"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-100 rounded-full translate-x-16 translate-y-16 opacity-30"></div>
                    <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
                    
                    {/* Icon with animation */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-2xl shadow-xl">
                            <Video className='h-12 w-12 text-white animate-bounce' />
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-4 max-w-md">
                        <h3 className="text-2xl font-bold text-gray-900">
                            No Interviews Created Yet
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Start building your interview collection! Create your first AI-powered interview to streamline your hiring process.
                        </p>
                        
                        {/* Features list */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-sm">
                            <div className="flex items-center space-x-2 text-gray-500">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>AI-Powered Questions</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-500">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span>Video Recording</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-500">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>Automated Scheduling</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-500">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span>Real-time Analysis</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Link href="/dashboard/create-interview">
                            <Button 
                                size="lg" 
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-3"
                            >
                                <Plus className="mr-2 h-5 w-5" />
                                Create Your First Interview
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Button 
                            variant="outline" 
                            size="lg"
                            className="border-gray-300 hover:bg-gray-50 px-8 py-3"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            View Templates
                        </Button>
                    </div>
                </div>
            )}
            
            {/* When interviews exist - placeholder for future implementation */}
            {interviewList?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interviewList.map((interview, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Video className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{interview.title}</h3>
                                        <p className="text-sm text-gray-500">{interview.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-1 text-xs text-gray-400">
                                    <Clock className="h-3 w-3" />
                                    <span>{interview.duration}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <span className="text-sm text-gray-500">
                                    Created {interview.createdAt}
                                </span>
                                <Button variant="ghost" size="sm">
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LatestInterviewList