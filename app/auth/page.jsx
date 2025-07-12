'use client'

import { Button } from "@/components/ui/button";
import {supabase} from "@/services/supabaseClient"
import Image from "next/image";
import React from "react";

const page = () => {
  const signWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
    redirectTo: `https://qwovxgadravgkloirfvr.supabase.co/auth/v1/callback`
  }
    });
    if (error) {
      console.error("Error", error.messaage);
    }
  };
  return (
    <div className="fex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col items-center border rounded-2xl p-8">
        {/* <Image src={""} width={400} height={100} className="w-[180px]"/> */}
        <div className="flex flex-col items-center">
          <Image
            src={"/login.jpg"}
            alt="login"
            width={600}
            height={400}
            className="w-[400px] h-[250px]"
          />
          <h2 className="font-bold text-gray-500 text-center text-2xl mt-5">
            Welcome to VoiceVue-AI
          </h2>
          <p className="font-bold text-gray-500 text-center text-2xl">
            Sign in With Google
          </p>
          <Button onClick={signWithGoogle}>Login With Google</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
