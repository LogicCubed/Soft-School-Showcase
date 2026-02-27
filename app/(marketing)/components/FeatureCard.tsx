import Image from "next/image";

interface FeatureSectionProps {
  artSrc: string;           // path to the image/logo
  title: string;            // main title
  text: string;             // description text
  reverse?: boolean;        // if true, art is on the right
}

export const FeatureCard = ({
  artSrc,
  title,
  text,
  reverse = false,
}: FeatureSectionProps) => {
  return (
    <div
      className={`bg-[#ff96bf] rounded-3xl w-4/5 max-w-4xl mx-auto my-12 p-8 flex flex-col md:flex-row items-center gap-8 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Art */}
      <div className="shrink-0 md:w-1/2 flex justify-center">
        <Image src={artSrc} width={300} height={300} alt="Art" className="object-contain" />
      </div>

      {/* Text */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl font-extrabold mb-4">{title}</h2>
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
};