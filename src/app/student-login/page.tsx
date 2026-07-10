"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { loginStudent } from "@/app/actions/studentAuth";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function StudentLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginStudent(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-white/20 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#4A90E2]/10 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-[#4A90E2]" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Student Portal</CardTitle>
          <CardDescription className="text-gray-500">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
              <Input
                name="username"
                type="text"
                required
                className="bg-white/50 dark:bg-gray-900/50"
                placeholder="john.doe"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              </div>
              <PasswordInput
                name="password"
                required
                className="bg-white/50 dark:bg-gray-900/50"
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full bg-brand-gradient text-white hover:opacity-90 shadow-md" disabled={loading}>
              {loading ? "Signing in..." : "Sign in to Dashboard"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-100 dark:border-gray-800 pt-6">
          <p className="text-sm text-gray-500">
            Don't have an account? <Link href="/ai-powered-digital-marketing-course-in-ayanavaram" className="text-[#4A90E2] hover:underline font-medium">Enroll now</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
