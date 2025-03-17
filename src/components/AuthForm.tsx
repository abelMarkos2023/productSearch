"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface AuthFormProps {
  type: "signin" | "signup";
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const endpoint = type === "signin" ? "/api/auth/signin" : "/api/auth/signup";
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      alert(type === "signin" ? "Welcome back!" : "Account created!");
      window.location.href = type === "signin" ? "/" : "/signin";
    } else {
      alert(data.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md p-8 bg-white bg-opacity-10 rounded-2xl shadow-xl backdrop-blur-md"
    >
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        {type === "signin" ? "Welcome Back!" : "Create an Account"}
      </h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
      >
        {type === "signin" ? "Sign In" : "Sign Up"}
      </button>
      <p className="text-center text-gray-300 mt-4">
        {type === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link href={type === "signin" ? "/signup" : "/signin"} className="text-blue-400 underline">
          {type === "signin" ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </motion.div>
  );
}
