"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    createUnityInstance?: (
      canvas: HTMLCanvasElement,
      config: Record<string, unknown>,
      onProgress?: (progress: number) => void
    ) => Promise<unknown>;
  }
}

export default function GamedevPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let mounted = true;
    const loaderUrl = "/unity/gamedev/Build/0.1.1.3_SoftSchool_Web_Scenario.loader.js";

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.async = true;

    script.onload = async () => {
      if (!mounted || !canvasRef.current || !window.createUnityInstance) return;

      const config = {
        dataUrl: "/unity/gamedev/Build/0.1.1.3_SoftSchool_Web_Scenario.data",
        frameworkUrl: "/unity/gamedev/Build/0.1.1.3_SoftSchool_Web_Scenario.framework.js",
        codeUrl: "/unity/gamedev/Build/0.1.1.3_SoftSchool_Web_Scenario.wasm",
        streamingAssetsUrl: "/unity/gamedev/StreamingAssets",
        companyName: "Digx7 Studios",
        productName: "SoftSchool Web Scenario",
        productVersion: "0.1.1.3",
      };

      try {
        await window.createUnityInstance(canvasRef.current, config);
      } catch (err) {
        console.error("Unity failed to load:", err);
      }
    };

    document.body.appendChild(script);

    return () => {
      mounted = false;
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Gamedev</h1>
      <canvas
        ref={canvasRef}
        id="unity-canvas"
        className="w-full max-w-5xl aspect-video bg-black rounded-lg"
      />
      <p className="mt-4 text-sm text-gray-500">
        If the game doesn't load, please check your browser's console for errors.
      </p>
    </div>
  );
}