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


export const Question_PROMPT = `You are an expert technical interviewer. Generate interview questions based on the job details provided.

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

CRITICAL INSTRUCTIONS:
1. Respond with ONLY valid JSON - no explanations, no markdown, no code blocks
2. Start your response with { and end with }
3. Follow this EXACT format:

{
  "interviewQuestions": [
    {
      "question": "Can you tell me about your experience with [specific technology/skill]?",
      "type": "Experience"
    },
    {
      "question": "How would you approach [specific problem related to the role]?",
      "type": "Problem Solving"
    }
  ]
}

Question types to use: Technical, Behavioral, Experience, Problem Solving, Leadership

Generate 5-8 questions based on the interview duration and job requirements. Make questions specific to the {{jobTitle}} role and {{jobDescription}}.

Remember: Your response must be valid JSON that starts with { and contains only the JSON object.`