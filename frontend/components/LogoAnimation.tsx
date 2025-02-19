"use client";

import { motion } from "framer-motion";

export default function LogoAnimation() {  // ✅ Change from `export function` to `export default function`
  return (
    <div className="flex h-screen w-full items-center justify-center bg-red-600">
      <motion.img
        src="/logo.png"
        alt="Moving Mountains Logistics"
        className="h-48 w-auto lg:h-64"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [20, 0, -20, 0],
        }}
        transition={{
          duration: 3,
          times: [0, 0.2, 0.8, 1],
        }}
      />
    </div>
  );
}
