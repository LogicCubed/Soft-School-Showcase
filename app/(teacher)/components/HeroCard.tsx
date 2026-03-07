"use client";

interface HeroCardProps {
  title: string;
  subtext: string;
  imageUrl?: string;
}

export default function HeroCard({ title, subtext, imageUrl }: HeroCardProps) {
  return (
    <div className="bg-sky-400 rounded-xl p-10 w-full max-w-6xl mx-auto flex items-center justify-between min-h-50 shadow-lg">
      {/* Left text */}
      <div className="flex-1 text-left">
        <h2 className="text-white text-5xl font-bold leading-tight">{title}</h2>
        <p className="text-slate-200 font-semibold mt-4 text-xl">{subtext}</p>
      </div>

      {/* Right image */}
      {imageUrl && (
        <div className="ml-8 shrink-0 flex items-center justify-center">
          <img
            src={imageUrl}
            alt="Illustration"
            className="h-40 w-40 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}