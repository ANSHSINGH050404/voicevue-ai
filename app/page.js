'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [selectedRole, setSelectedRole] = useState('Data Analyst');
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(0); // First FAQ expanded by default

  //routing

  const router=useRouter();

  // Job roles available
  const jobRoles = [
    'Custom Job Description',
    'Software Engineer',
    'Business Analyst',
    'Product Manager',
    'Marketing Specialist',
    'Customer Service Representative',
    'Data Analyst'
  ];

  // Sample questions for different roles
  const questions = {
    'Data Analyst': 'Is there a specific instance where your in-depth analysis significantly influenced a business strategy or decision?',
    'Software Engineer': 'Describe a challenging technical problem you solved and walk me through your approach.',
    'Business Analyst': 'How do you prioritize requirements when stakeholders have conflicting needs?',
    'Product Manager': 'Tell me about a time you had to make a difficult product decision with limited data.',
    'Marketing Specialist': 'How do you measure the success of a marketing campaign?',
    'Customer Service Representative': 'Describe how you would handle an upset customer who feels their issue isn\'t being resolved.',
    'Custom Job Description': 'Tell me about your most significant professional achievement and its impact.'
  };

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsRecording(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsActive(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsActive(false);
  };

  const resetTimer = () => {
    setTimeLeft(180);
    setIsActive(false);
    setIsRecording(false);
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "Why did you make this site?",
      answer: (
        <div className="text-gray-700 space-y-4">
          <p>
            Ever been in a job interview for your dream role, only to completely blank on all your 
            answers? Or maybe you spent all night prepping, but they didn't even ask anything you 
            prepared for? Us too. It's not fun.
          </p>
          <p>
            With the current job market and ongoing recession, interviews just became that much 
            more important and stressful.
          </p>
          <p>
            Interviews by AI wants to make your next job interview stress-free by boosting your 
            confidence, calming your nerves, and helping you land that job. Our AI tool 
            accomplishes this by leveraging groundbreaking technologies like GPT-4 (ChatGPT) to 
            deliver hyper-realistic interview questions and answers along with actionable feedback.
          </p>
          <p>
            It's the closest you'll get to the actual questions in an interview.
          </p>
        </div>
      )
    },
    {
      question: "How accurate are the AI interview questions and feedback?",
      answer: (
        <div className="text-gray-700 space-y-4">
          <p>
            Our AI generates highly realistic interview questions by analyzing thousands of real job interviews 
            and job descriptions. The questions are tailored specifically to your role and industry.
          </p>
          <p>
            The feedback is powered by GPT-4 and evaluates your responses on clarity, relevance, structure, 
            and confidence. While it's not perfect, it provides valuable insights to help you improve.
          </p>
          <p>
            Many users report that our questions closely match what they encountered in actual interviews, 
            giving them a significant advantage in preparation.
          </p>
        </div>
      )
    },
    {
      question: "Can I use this site to practice interviews for any job role?",
      answer: (
        <div className="text-gray-700 space-y-4">
          <p>
            Yes! Our AI works across all industries and job levels. Whether you're applying for entry-level 
            positions or executive roles, in tech, healthcare, finance, or any other field.
          </p>
          <p>
            You can either select from our predefined job roles or paste your own custom job description. 
            The AI will generate relevant questions based on the specific requirements and responsibilities.
          </p>
          <p>
            From behavioral questions to technical challenges, we cover all types of interview formats 
            commonly used by employers.
          </p>
        </div>
      )
    },
    {
      question: "How is this different than using ChatGPT?",
      answer: (
        <div className="text-gray-700 space-y-4">
          <p>
            While ChatGPT is a general-purpose AI, our platform is specifically designed for interview 
            preparation with specialized prompts and frameworks.
          </p>
          <p>
            We provide structured interview sessions with timing, recording capabilities, and detailed 
            feedback analysis. ChatGPT would require you to manually craft prompts and manage the entire process.
          </p>
          <p>
            Our AI also includes interview-specific features like answer scoring, improvement suggestions, 
            and industry-specific question banks that aren't available in general ChatGPT conversations.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>InterviewsBy.ai - AI Interview Prep</title>
        <meta name="description" content="Practice job interview questions with AI feedback" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">i</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Voicevue.ai</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Pricing</button>
              <button onClick={()=>router.push('/dashboard')} className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50">
                
                <span className="text-sm">Get Started</span>
                
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            <div className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium inline-block">
              #1 AI Interview Prep
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Boost your confidence,<br />
                ace the job interview
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Practice job interview questions tailored to your job description. 
                Get instant AI feedback and suggestions to improve your answers.
              </p>
            </div>

            <div>
              <button onClick={()=>router.push('/dashboard')} className="bg-gray-800 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors">
                Try now for free →
              </button>
              <p className="text-sm text-gray-500 mt-2">No credit card needed</p>
            </div>

            {/* User testimonials */}
            <div className="flex items-center space-x-4 pt-8">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
              </div>
              <div>
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
                <p className="text-sm text-gray-600">Trusted by 50,000+ job seekers</p>
              </div>
            </div>
          </div>

          {/* Right Panel - Interview Practice */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <p className="text-center text-gray-600 mb-4">
                Turn a <span className="font-semibold">job description</span> into{' '}
                <span className="font-semibold">interview questions</span> to practice with:
              </p>
              
              {/* Job Role Selection */}
              <div className="flex flex-wrap gap-2 mb-6">
                {jobRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedRole === role
                        ? 'bg-teal-100 text-teal-800 border-2 border-teal-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Interview Question */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                {questions[selectedRole]}
              </h3>
              
              {/* Timer */}
              <div className="text-center mb-4">
                <div className="text-3xl font-mono text-gray-400">
                  {formatTime(timeLeft)} / 3:00
                </div>
              </div>

              {/* Record Button */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {isRecording ? (
                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                  ) : (
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                  )}
                </button>
              </div>

              {/* Reset Timer Button */}
              <div className="flex justify-center">
                <button
                  onClick={resetTimer}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Reset Timer
                </button>
              </div>
            </div>

            {/* Feedback and Sample Response */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <span className="text-gray-700">Feedback</span>
                <span className="text-gray-400">›</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <span className="text-gray-700">Sample Response</span>
                <span className="text-gray-400">›</span>
              </div>
            </div>
          </div>
        </div>

        {/* How it works section */}
        <section className="mt-20 py-16">
          <div className="text-center mb-12">
            <div className="inline-block bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              How it works
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Give yourself an unfair advantage in interviews
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Wouldn't it be nice to know which questions the recruiters will ask you{' '}
              <span className="italic text-gray-500">(and how to answer them)</span>{' '}
              before the interview?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Step description */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Step 1 - Generate questions</h3>
                  <p className="text-gray-600">
                    Paste a job description, receive{' '}
                    <span className="text-teal-600 font-medium">realistic interview questions</span>, tailored to the role.
                  </p>
                </div>
              </div>

              <div className="space-y-4 ml-16">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Behavioral and technical questions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Works for all job descriptions and industries</span>
                </div>
              </div>
            </div>

            {/* Right side - Interactive demo */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                {/* Job Role Selection */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    'Custom Job Description',
                    'Business Analyst',
                    'Product Manager',
                    'Software Engineer',
                    'Marketing Specialist',
                    'Customer Service Representative',
                    'Sales Representative',
                    'Human Resources Specialist',
                    'Data Analyst',
                    'UX/UI Designer',
                    'QA Engineer'
                  ].map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        selectedRole === role
                          ? 'bg-teal-100 text-teal-800 border-2 border-teal-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                {/* Text Area */}
                <div className="relative">
                  <textarea
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Select a job role above or paste your own description here..."
                    defaultValue=""
                  />
                  
                

                  {/* Character count */}
                  <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                    5000 chars left
                  </div>
                </div>

                {/* Generate button */}
                <div className="mt-6 flex justify-end">
                  <button onClick={()=>router.push('/dashboard')} className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <span>Generate Questions</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-20 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-gray-600">
              How can we help you?
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-6">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}