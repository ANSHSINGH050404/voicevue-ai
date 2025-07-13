"use client";

import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "./_components/FormContainer";
import OuestionList from "./_components/OuestionList";
import { toast } from "sonner";
import InterviewLink from "./_components/Interview€Link";

const CreateInterview = () => {
  const router = useRouter();
  const [step, setstep] = useState(1);
  const [formData, setformData] = useState();

  const [interviewId, setinterviewId] = useState();

  const onHandleInputChanges = (field, value) => {
    setformData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log("formdata", formData);
  };
  const onGoToNext = () => {
    if (
      !formData?.jobPosition ||
      !formData?.jobDescription ||
      !formData?.duration ||
      !formData?.type
    ) {
      toast("Please enter all detail");
      return;
    }
    setstep(step + 1);
  };

  const onCreateLink = (interview_id) => {
    setinterviewId(interview_id);
    setstep(step + 1);
  }
  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="gap-5 flex items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress value={step * 33} className="my-5" />
      {step == 1 ? (
        <FormContainer
          onHandleInputChanges={onHandleInputChanges}
          GoToNext={() => onGoToNext()}
        />
      ) : step == 2 ? (
        <OuestionList
          formData={formData}
          onCreateLink={(interview_id) => onCreateLink(interview_id)}
        />
      ) : step == 3 ? (
        <InterviewLink interview_id={interviewId} formData={formData} />
      ) : null}
    </div>
  );
};

export default CreateInterview;
