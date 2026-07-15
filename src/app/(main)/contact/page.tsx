import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { ContactMap } from "@/components/ContactMap";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Hirloye",
  description: "Get in touch with Hirloye.",
  alternates: {
    canonical: "/contact",
    languages: {
      "en": "/contact",
      "x-default": "/contact",
    },
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pb-8">
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Let's <span className="text-gradient">Connect</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Have a question or want to work with us? We'd love to hear from you. Drop us a message and we'll reply as soon as possible.
        </p>
      </section>

      <section className="container px-4 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="glass border-none shadow-xl">
            <CardContent className="p-8 md:p-12">
              <ContactForm />
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="flex flex-col space-y-8 lg:py-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 bg-[#4A90E2]/10 rounded-full text-[#4A90E2] mr-4 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Our Office</h3>
                    <p className="text-gray-500 dark:text-gray-400">NMK Street, Ayanavaram<br/>Chennai – 600023</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-3 bg-[#7B68EE]/10 rounded-full text-[#7B68EE] mr-4 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone Number</h3>
                    <p className="text-gray-500 dark:text-gray-400">+91 79047 13677</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-3 bg-[#4A90E2]/10 rounded-full text-[#4A90E2] mr-4 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-500 dark:text-gray-400">info@hirloye.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-3 bg-[#7B68EE]/10 rounded-full text-[#7B68EE] mr-4 shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Website</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      <a href="https://www.hirloye.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#7B68EE] transition-colors">
                        www.hirloye.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 mt-4 relative">
              <ContactMap />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
