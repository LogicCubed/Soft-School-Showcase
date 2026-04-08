"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    createUnityInstance?: (
      canvas: HTMLCanvasElement,
      config: Record<string, unknown>,
      onProgress?: (progress: number) => void
    ) => Promise<unknown>;
    receiveUnityOutput?: (value: string) => void;
  }
}

export default function GamedevPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const unityInstanceRef = useRef<unknown>(null);
  const [unityOutput, setUnityOutput] = useState("NA");

    // Your JS function
  function handleButtonClick(param?: string) {
    console.log("Button clicked!");
    const unity = unityInstanceRef.current as { SendMessage: (obj: string, method: string, param?: string) => void } | null;
    unity?.SendMessage("HostManager", "Input", param ?? "Hello World!");
  }

  useEffect(() => {
    window.receiveUnityOutput = (value: string) => {
    setUnityOutput(value);
  };
    
    let mounted = true;
    const loaderUrl = "/unity/gamedev/Build/0.1.2.4_SoftSchool_Web_Scenario.loader.js";

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.async = true;

    script.onload = async () => {
      if (!mounted || !canvasRef.current || !window.createUnityInstance) return;

      const config = {
        dataUrl: "/unity/gamedev/Build/0.1.2.4_SoftSchool_Web_Scenario.data.br",
        frameworkUrl: "/unity/gamedev/Build/0.1.2.4_SoftSchool_Web_Scenario.framework.js.br",
        codeUrl: "/unity/gamedev/Build/0.1.2.4_SoftSchool_Web_Scenario.wasm.br",
        streamingAssetsUrl: "/unity/gamedev/StreamingAssets",
        companyName: "Digx7 Studios",
        productName: "SoftSchool Web Scenario",
        productVersion: "0.1.2.4",
      };

      try {
        unityInstanceRef.current = await window.createUnityInstance(canvasRef.current, config);
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
      <h1 className="text-2xl font-bold mb-4">Game =============</h1>
      <canvas
        ref={canvasRef}
        id="unity-canvas"
        // className="w-full max-w-5xl aspect-video bg-black rounded-lg"
        // className="w-full max-w-5xl bg-black rounded-lg"
        className="w-full mx-auto bg-black rounded-lg aspect-[9/16] sm:aspect-video max-w-[420px] sm:max-w-5xl"
      />
      <br />
      <h1 className="text-2xl font-bold mb-4">Website =============</h1>
      <h2 className="text-2xl font-bold mb-4">Input buttons</h2>
      <button
        onClick={() => handleButtonClick("1")}
        className="mt-4 px-5 py-2 bg-sky-400 text-white font-bold rounded hover:bg-sky-500 transition-colors"
      >
        1
      </button>
      <button
        onClick={() => handleButtonClick("2")}
        className="mt-4 px-5 py-2 bg-sky-400 text-white font-bold rounded hover:bg-sky-500 transition-colors"
      >
        2
      </button>
      <button
        onClick={() => handleButtonClick("3")}
        className="mt-4 px-5 py-2 bg-sky-400 text-white font-bold rounded hover:bg-sky-500 transition-colors"
      >
        3
      </button>
      <h2 className="text-2xl font-bold mb-4">Output </h2>
      <p>{unityOutput}</p>
    </div>
  );
}