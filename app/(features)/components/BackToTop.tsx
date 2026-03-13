"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "components/ui/button";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="sticky bottom-20 w-full flex justify-end pr-4 z-50">
      <Button
        variant="primary"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`
          w-12 h-12 p-0 rounded-md cursor-pointer
          transition-all duration-300 ease-in-out
          ${visible
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-0 pointer-events-none"
          }
        `}
        style={{ transformOrigin: "center" }}
      >
        <ArrowUp className="w-8 h-8 stroke-6" size={32} />
      </Button>
    </div>
  );
}