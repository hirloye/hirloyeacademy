"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ApplicationForm } from "@/components/ApplicationForm";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";

interface ApplyModalProps {
  type: "job" | "internship";
  positionId: string;
  positionTitle: string;
}

export function ApplyModal({ type, positionId, positionTitle }: ApplyModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: type === "job" ? "outline" : "default", className: "w-full sm:w-auto inline-flex" })}>
        Apply Now <ArrowRight className="w-4 h-4 ml-2" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="sr-only">Apply for {positionTitle}</DialogTitle>
        <DialogDescription className="sr-only">Fill out this form to apply for {positionTitle}</DialogDescription>
        
        {/* We reuse the ApplicationForm but pass a callback to close the modal on success if needed, or just let it show success message */}
        <ApplicationForm 
          type={type} 
          positionId={positionId} 
          positionTitle={positionTitle} 
          onSuccess={() => setTimeout(() => setOpen(false), 2000)}
        />
      </DialogContent>
    </Dialog>
  );
}
