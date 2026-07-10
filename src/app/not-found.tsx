import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#7B68EE]">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button className="w-full sm:w-auto bg-[#7B68EE] hover:bg-[#6A5AE0] text-white">
              Back to Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="w-full sm:w-auto">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
