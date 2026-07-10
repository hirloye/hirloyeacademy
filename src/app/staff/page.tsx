"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Users, Lock } from "lucide-react";
import { loginStaff } from "@/app/actions/staff";
import Link from "next/link";

export default function StaffLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const res = await loginStaff(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#4A90E2]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#7B68EE]/10 blur-[120px] rounded-full pointer-events-none" />

      <Link href="/" className="mb-8 flex items-center space-x-3 relative z-10">
        <img src="/logo.png" alt="Hirloye Logo" className="h-16 w-auto" />
        <span className="text-2xl font-bold text-gray-900 dark:text-white font-secondary">Hirloye</span>
      </Link>

      <Card className="w-full max-w-md border-none shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl relative z-10">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-12 h-12 bg-[#EBF5FF] dark:bg-blue-900/30 text-[#4A90E2] rounded-full flex items-center justify-center mb-4">
            <Users className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold">Staff Portal</CardTitle>
          <CardDescription>Enter your credentials to access the batch management panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm text-center border border-red-100 dark:border-red-800">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  name="username"
                  required
                  placeholder="e.g. hly04" 
                  className="pl-10 h-12 bg-white/50 dark:bg-black/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <PasswordInput 
                  name="password"
                  required
                  placeholder="••••" 
                  className="pl-10 h-12 bg-white/50 dark:bg-black/50"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold bg-brand-gradient hover:opacity-90 transition-opacity" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 relative z-10">
        Secured by Hirloye Careers
      </p>
    </div>
  );
}
