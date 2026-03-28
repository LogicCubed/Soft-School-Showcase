import Image from "next/image";

interface HeroSectionProps {
  artSrc: string;
  title1: string;
  title2: string;
  subtitle: string;
}

export const HeroSection = ({ artSrc, title1, title2, subtitle }: HeroSectionProps) => {
  return (
    <div className="relative bg-sky-400 w-full">
      {/* Hero content */}
      <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            {title1} <br /> {title2}
          </h1>
          <p className="text-lg md:text-lg font-semibold">{subtitle}</p>
        </div>

        {/* Art / Lottie */}
        <div className="md:w-1/2 flex justify-center">
          <Image src={artSrc} width={400} height={400} alt="Hero Animation" className="object-contain select-none pointer-events-none" />
        </div>
      </div>

      {/* Wave at bottom */}
      <div className="absolute -bottom-32 left-0 w-full overflow-hidden leading-0">
        <svg
          className="w-full h-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#00bcff"
            fillOpacity="1"
            d="M0,160L48,149.3C96,139,192,117,288,112C384,107,480,117,576,144C672,171,768,213,864,202.7C960,192,1056,128,1152,117.3C1248,107,1344,149,1392,170.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
    </div>
  );
};