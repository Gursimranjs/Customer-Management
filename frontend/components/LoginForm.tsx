"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Import the CSS module
import styles from "./LoginForm.module.css";

export function LoginForm() {
    const [email, setEmail] = useState("demo@movingmountains.com");
    const [password, setPassword] = useState("demo123");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For now, accept any non-empty email and password
        if (email.trim() && password.trim()) {
            login("dummy-token");
            router.push("/dashboard");
        } else {
            setError("Please enter both email and password");
        }

        setLoading(false);
    };

    return (
        <div className={styles["login-container"]}>
            <div className={styles["login-card"]}>
            <div className={styles["logo"]}>
                    <Image
                        src="/Logo.png"
                        alt=""
                        width={200}
                        height={150}
                        priority
                    />
                </div>
                <form onSubmit={handleSubmit} className={styles["login-card-2"]}>
                    <h1 className={styles["login-title"]}>Moving Mountains Logistics</h1>
                    <p className={styles["login-description"]}>Login to your account</p>

                    <div className="space-y4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-base">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles["input-field"]}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-base">
                                Password
                            </Label>
                            <div className={styles["password-container"]}>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles["input-field"]}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles["password-toggle"]}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>
                    {error && <div className={styles["error-message"]}>{error}</div>}
                    <div className="flex items-center justify-between">
                        <Link href="/forgot-password" className={styles["forgot-password"]}>
                            Forgot your password?
                        </Link>
                    </div>
                    <Button type="submit" className={styles["login-button"]} disabled={loading}>
                        {loading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
