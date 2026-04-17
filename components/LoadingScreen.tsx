"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLoading } from "@/store/loadingStore";
import { quotes } from "@/lib/copy/quotes";

export const LoadingScreen = () => {
  const isLoading = useLoading((s) => s.isLoading);

  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      setShow(true);

      setVisible(false);

      // pick ONE quote per loading session
      const random = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(random);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      setVisible(false);

      timeout = setTimeout(() => setShow(false), 300);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-sky-400 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src="/assets/characters/softy/softy.svg"
        alt="Softy"
        width={180}
        height={180}
        className="animate-bounce mb-4"
      />

      <div className="text-4xl font-bold text-white text-center px-6">
        {quote}
      </div>
    </div>
  );
};