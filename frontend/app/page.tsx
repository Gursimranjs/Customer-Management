"use client";  

import { useState, useEffect } from "react";
import LogoAnimation from "@/components/LogoAnimation";
import {LoginForm} from "@/components/LoginForm";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowLogin(true);
    }, 3000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {showLogin ? <LoginForm /> : <LogoAnimation />}
    </div>
  );
}
