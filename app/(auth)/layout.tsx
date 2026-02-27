"use client";

import { Button } from "components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="h-screen bg-white p-4">
      <div className="relative h-full flex gap-4">

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="default"
            size="icon"
            onClick={() => router.push("/")}
            className="rounded-full cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={3} />
          </Button>
        </div>

        {/* Login Form */}
        <div className="flex w-full md:w-1/2 items-center justify-center bg-white rounded-2xl">
          {children}
        </div>

        {/* Right Splash Art */}
        <div className="hidden md:flex w-1/2 bg-sky-400 rounded-2xl items-center justify-center">
          <div className="text-white text-4xl font-extrabold">
            Soft School
          </div>
        </div>

      </div>
    </div>
  );
}