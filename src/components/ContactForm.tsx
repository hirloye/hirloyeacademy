"use client";

import { useState } from "react";
import { submitEnquiry } from "@/app/actions/admin";
import { Send, MessageCircle } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    const formData = new FormData(e.currentTarget);
    const res = await submitEnquiry(formData);

    setLoading(false);
    if (res.error) {
      setMessage(`Error: ${res.error}`);
    } else {
      setIsSuccess(true);
      setMessage("Your message has been sent successfully! We will get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg text-sm font-medium ${isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name</label>
          <input type="text" name="first_name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#4A90E2]/50 outline-none transition-all" placeholder="John" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Last Name</label>
          <input type="text" name="last_name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#4A90E2]/50 outline-none transition-all" placeholder="Doe" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Email Address</label>
        <input type="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#4A90E2]/50 outline-none transition-all" placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Subject</label>
        <select name="subject" required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#4A90E2]/50 outline-none transition-all">
          <option value="General Inquiry">General Inquiry</option>
          <option value="Services">Services</option>
          <option value="Course Details">Course Details</option>
          <option value="Job Application">Job Application</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Message</label>
        <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#4A90E2]/50 outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
      </div>
      
      <button type="submit" disabled={loading} className="w-full bg-brand-gradient text-white py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50">
        {loading ? "Sending..." : "Send Message"} <Send className="w-5 h-5 ml-2" />
      </button>

      {/* Social Grid */}
      <div className="grid grid-cols-3 gap-4 w-full pt-2">
        <a href="https://www.instagram.com/hirloye" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-2xl p-4 flex flex-col items-center justify-center text-white hover:-translate-y-1 transition-transform shadow-lg">
          <InstagramIcon className="w-6 h-6 mb-1 md:mb-2" />
          <span className="font-medium text-[10px] md:text-sm">Instagram</span>
        </a>
        <a href="https://www.linkedin.com/company/hirloye" target="_blank" rel="noopener noreferrer" className="bg-[#0077B5] rounded-2xl p-4 flex flex-col items-center justify-center text-white hover:-translate-y-1 transition-transform shadow-lg">
          <LinkedinIcon className="w-6 h-6 mb-1 md:mb-2" />
          <span className="font-medium text-[10px] md:text-sm">LinkedIn</span>
        </a>
        <a href="https://wa.me/917904713677" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] rounded-2xl p-4 flex flex-col items-center justify-center text-white hover:-translate-y-1 transition-transform shadow-lg">
          <MessageCircle className="w-6 h-6 mb-1 md:mb-2" />
          <span className="font-medium text-[10px] md:text-sm">WhatsApp</span>
        </a>
      </div>
    </form>
  );
}

