"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import styles from "@/components/ForgotPassword.module.css"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessage("Check your email for reset instructions.")
      router.push("/otp-verification")
    } catch (error) {
      setMessage("Error sending reset link.")
    }
  }

  return (
    <div className={styles["forgot-container"]}>
      <div className={styles["forgot-card"]}>
        <div className={styles["logo"]}>
          <Image src="/Logo.png" alt="Moving Mountains Logistics" width={150} height={100} priority />
        </div>
        <form onSubmit={handleSubmit} className={styles["forgot-card-2"]}>
          <h1 className={styles["forgot-title"]}>Forgot Password</h1>
          <p className={styles["forgot-description"]}>Enter your email to reset your password</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={styles["input-field"]}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {message && <div className={styles["message"]}>{message}</div>}
          <Button type="submit" className={styles["forgot-button"]}>
            Send Reset Link
          </Button>
          <Link href="/" className={styles["back-to-login"]}>
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  )
}

