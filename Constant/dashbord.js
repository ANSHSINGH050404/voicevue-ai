import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const SideBarOption=[
    {
        name:"Dashboard",
        icon:LayoutDashboard,
        path:"./dashboard",
    },
    {
        name:"Schedule Interview",
        icon:Calendar,
        path:"./Schedule Interview",
    },
    {
        name:"All Interview",
        icon:List,
        path:"./All Interview",
    },
    {
        name:"Billing",
        icon:WalletCards,
        path:"./Billing",
    },
    {
        name:"Setting",
        icon:Settings,
        path:"./Setting",
    },
]


export const InterviewType=[
    {
        title:"Technical",
        icon:Code2Icon,
    },
    {
        title:"Behavioral",
        icon:User2Icon,
    },
    {
        title:"Experiance",
        icon:BriefcaseBusinessIcon,
    },
    {
        title:"Problem Solving",
        icon:Puzzle,
    },
]

export const Question_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {jobTitle}
Job Description: {jobDescription}
Interview Duration: {duration}
Interview Type: {type}
📄 Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {type} interview.
🍀 Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
question:"",
type:"Technical/Behavioral/Experience/Problem Solving/Leadership"
},{
...
}]
🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {jobTitle} role.`