"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Loader2,
  Sparkles,
  Lock,
  Mail,
  User as UserIcon,
  Eye,
  EyeOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/provider";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const { user, login, register } = useUser();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(
          formData.name,
          formData.email,
          formData.password,
        );
      }

      if (result.success) {
        toast.success(
          isLogin ? "Logged in successfully!" : "Account created successfully!",
        );
        router.push("/dashboard");
      } else {
        toast.error(result.error || "Authentication failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main auth container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md z-10"
      >
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 p-8 border border-white/10"
        >
          {/* Logo/Brand section */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              VoiceVue AI
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Your AI-powered interview coach
            </p>
          </motion.div>

          {/* Toggle between Login and Register */}
          <motion.div
            variants={itemVariants}
            className="flex gap-2 mb-6 bg-gray-900/50 p-1 rounded-xl border border-white/5"
          >
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg transition-all font-medium ${
                isLogin
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg transition-all font-medium ${
                !isLogin
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Register
            </button>
          </motion.div>

          {/* Auth Form */}
          <motion.form
            variants={containerVariants}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <UserIcon className="w-4 h-4 inline mr-2" />
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required={!isLogin}
                    className="w-full bg-gray-900/50 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/50"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full bg-gray-900/50 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/50"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-900/50 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </span>
                  </div>
                ) : (
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                )}
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <span className="text-purple-400 hover:text-purple-300 cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-purple-400 hover:text-purple-300 cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-60"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default AuthPage;
