import { Button } from "components/ui/button";

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: React.ReactNode;
  billing: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export default function PricingCard({
  title,
  subtitle,
  price,
  billing,
  features,
  cta,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl border p-8 flex flex-col justify-between transition-all ${
        highlighted
          ? "border-white/30 bg-neutral-900 shadow-2xl scale-105"
          : "border-white/10 bg-neutral-900"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-3 py-1 rounded-full font-medium">
          Most Popular
        </div>
      )}

      <div>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>

        <div className="mt-6">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-neutral-400 ml-2">{billing}</span>
        </div>

        <ul className="mt-6 space-y-3 text-sm text-neutral-300">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 text-white">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Button
          variant={highlighted ? "primary" : "secondary"}
          className="w-full cursor-pointer"
        >
          {cta}
        </Button>
      </div>
    </div>
  );
}