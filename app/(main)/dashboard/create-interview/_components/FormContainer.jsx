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
import { ArrowRight } from "lucide-react";
import { validators } from "tailwind-merge";

const FormContainer = ({ onHandleInputChanges,GoToNext }) => {
  const [interviewType, setinterviewType] = useState([]);

  useEffect(() => {
    if (interviewType) {
      onHandleInputChanges("type", interviewType);
    }
  }, [interviewType]);

  const AddInterviewType = (type) => {
    const data = interviewType.includes(type);
    if (!data) {
      setinterviewType((prev) => [...prev, type]);
    } else {
      const result = interviewType.filter((item => item != type));
      setinterviewType(result);
    }
  };

  return (
    <div className="bg-white p-5">
      <div>
        <h2 className="text-sm font-bold">Job Position</h2>
        <Input
          placeholder="eg.Full Stack Developer"
          className="mt-2"
          onChange={(event) =>
            onHandleInputChanges("jobPosition", event.target.value)
          }
        />
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-bold">Job Description</h2>
        <Textarea
          placeholder="eg.Full Stack Developer"
          className="h-[200px] mt-2"
          onChange={(event) =>
            onHandleInputChanges("jobDescription", event.target.value)
          }
        />
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-bold">Interview Duration</h2>
        <Select
          onValueChange={(value) => onHandleInputChanges("duration", value)}
        >
          <SelectTrigger className="w-full ">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Min</SelectItem>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5"></div>

      <div className="mt-5">
        <h2 className="text-sm font-bold">Interview Type</h2>

        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex gap-2 p-2 bg-white border-2 border-gray-400 rounded-2xl cursor-pointer items-center hover:bg-gray-200
                ${interviewType.includes(type.title) && " text-blue-500"}
                `}
              onClick={() => AddInterviewType(type.title)}
            >
              <type.icon className="h-4 w-4" />

              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-end" onClick={()=>GoToNext()}>
        <Button>
          Generate Question <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default FormContainer;
