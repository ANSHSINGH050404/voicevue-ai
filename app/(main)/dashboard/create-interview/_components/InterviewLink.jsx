import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Copy, List } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const InterviewLink = ({ formdata, interview_id }) => {
  const GetInterviewUrl = () => {
    // console.log(interviewId);

    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;
    console.log(url);

    return url;
  };
  const interviewUrl = GetInterviewUrl();

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(interviewUrl);
    toast("Link Copied");
  };
  return (
    <div className="flex justify-center items-center mt-10 flex-col">
      <h2 className="font-bold text-lg mt-4">Your AI Interview</h2>
      <p className="mt-3">Share this link With the Candidate</p>

      <div className="w-full bg-white mt-6 rounded-2xl p-7 ">
        <div className="flex justify-between items-center">
          <h2>Interview Link</h2>
          <h2 className="p-1 px-2 text-blue-500">Valid for 30 days</h2>
        </div>

        <div>
          <Input value={interviewUrl || ""} readOnly={true} />
          <Button onClick={() => onCopyLink()} className="mt-2">
            {" "}
            <Copy />
            Copy link
          </Button>
        </div>
        <hr className="my-7" />

        <div className="flex gap-5">
          <h2 className="flex gap-2 items-center ">
            <Clock className="h-4 w-4" />
            {formdata?.duration}
          </h2>
          <h2 className="flex gap-2 items-center ">
            <List className="h-4 w-4" />
            {formdata?.questionList?.length || 0} Questions
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InterviewLink;
