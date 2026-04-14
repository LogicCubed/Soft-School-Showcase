"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "@/store/loadingStore";

export const LoadingReset = () => {
  const pathname = usePathname();

  useEffect(() => {
    useLoading.getState().setLoading(false);
  }, [pathname]);

  return null;
};