"use client";

import { useState } from "react";
import Script from "next/script";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitCourseEnrollment } from "@/app/actions/admin";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/app/actions/razorpay";

export function CourseEnrollmentForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);

  const handleStep1Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitCourseEnrollment(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.id) {
      setEnrollmentId(result.id);
      setStep(2);
    }
    setLoading(false);
  };

  const handleStep2Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!enrollmentId) return;

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const amountStr = formData.get("amount_paid") as string;
    const amount = Number(amountStr);

    if (!amount || amount < 0) {
      setError("Please enter a valid advance payment amount (minimum ₹1).");
      setLoading(false);
      return;
    }

    // 1. Create order on server
    const orderResult = await createRazorpayOrder(amount);

    if (orderResult.error || !orderResult.order_id) {
      setError(orderResult.error || "Failed to initialize payment gateway.");
      setLoading(false);
      return;
    }

    // 2. Setup Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your public key
      amount: amount * 100, // paise
      currency: "INR",
      name: "Hirloye Careers",
      description: "Course Advance Payment",
      order_id: orderResult.order_id,
      handler: async function (response: any) {
        setLoading(true); // Keep loading while we verify
        // 3. Verify on server
        const verifyResult = await verifyRazorpayPayment(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature,
          enrollmentId,
          formData
        );

        if (verifyResult.error) {
          setError(verifyResult.error);
          setLoading(false);
        } else {
          setSuccess(true);
          setTimeout(() => {
            setIsOpen(false);
            setSuccess(false);
            setStep(1);
            setEnrollmentId(null);
          }, 4000);
          setLoading(false);
        }
      },
      prefill: {
        name: "Student", // You could pass this from step 1 state if desired
        email: "",
        contact: ""
      },
      theme: {
        color: "#4A90E2",
      },
    };

    const RazorpayConstructor = (window as any).Razorpay;
    if (!RazorpayConstructor) {
      setError("Razorpay SDK failed to load. Are you offline?");
      setLoading(false);
      return;
    }

    const rzp = new RazorpayConstructor(options);

    rzp.on("payment.failed", function (response: any) {
      setError(`Payment Failed: ${response.error.description}`);
      setLoading(false);
    });

    rzp.open();
  };

  return (
    <>
      {/* Load Razorpay SDK securely */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setStep(1);
          setSuccess(false);
          setEnrollmentId(null);
          setError(null);
        }
      }}>
        <DialogTrigger
          render={
            <Button size="lg" className="h-14 px-8 text-lg bg-white text-gray-900 hover:bg-gray-100 shadow-lg">
              Enroll Now
            </Button>
          }
        />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {step === 1 ? "Course Enrollment" : "Payment & Details"}
            </DialogTitle>
            <DialogDescription>
              {step === 1
                ? "Fill out your contact details below."
                : "Complete your educational details and pay the advance amount."}
            </DialogDescription>
          </DialogHeader>

          {success ? (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg text-center">
              <h3 className="font-bold mb-2">Payment Successful!</h3>
              <p className="text-sm">Your enrollment and advance payment have been securely recorded. The admin will review it and you will receive an email shortly.</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              {step === 1 ? (
                <form key="step-1" onSubmit={handleStep1Submit} className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first_name" className="text-sm font-medium">First Name</label>
                      <Input id="first_name" name="first_name" required placeholder="John" defaultValue="" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last_name" className="text-sm font-medium">Last Name</label>
                      <Input id="last_name" name="last_name" required placeholder="Doe" defaultValue="" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input id="email" name="email" type="email" required placeholder="john@example.com" defaultValue="" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                    <Input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" defaultValue="" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium">Location</label>
                    <Input id="location" name="location" required placeholder="City, State" defaultValue="" />
                  </div>

                  <input type="hidden" name="course_name" value="Digital Marketing Certification" />

                  <div className="pt-4 flex justify-end">
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? "Processing..." : "Next"}
                    </Button>
                  </div>
                </form>
              ) : (
                <form key="step-2" onSubmit={handleStep2Submit} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="education_qualification" className="text-sm font-medium">Education Qualification</label>
                    <Input id="education_qualification" name="education_qualification" required placeholder="e.g. B.Tech, MBA" defaultValue="" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="amount_paid" className="text-sm font-medium">Advance Payment Amount (₹)</label>
                    <Input id="amount_paid" name="amount_paid" type="number" required defaultValue="40000" min="1" />
                    <p className="text-xs text-gray-500">Full course fee is ₹40,000. For first time visits, you can edit this to pay a manual advance amount for batch allotment.</p>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button type="submit" disabled={loading} className="w-full bg-[#4A90E2] hover:bg-[#4A90E2]/90">
                      {loading ? "Initializing..." : "Pay via Razorpay"}
                    </Button>
                  </div>
                </form>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
