import { Phone, Video } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreateOption = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Link href={'/dashboard/create-interview'} className="bg-white border-gray-300 rounded-2xl p-5 cursor-pointer"
    
      >
        <Video className="p-3 text-primary bg-blue-50 rounded-2xl h-12 w-12" />
        <h2>Create AI Interviews </h2>
        <p>Create AI Interviews and Schedule</p>
      </Link>
      <div className="bg-white border-gray-300 rounded-2xl p-5">
        <Phone className="p-3 text-primary bg-blue-50 rounded-2xl h-12 w-12" />
        <h2>Create Phone Screnning Call </h2>
        <p>Create AI Interviews and Schedule</p>
      </div>
      
    </div>
  );Link
}
export default CreateOption;
