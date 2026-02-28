import { Benefits } from "./Benefits";
import { CTASection } from "./CTA-Section";
import { Hero } from "./Hero";
import { HowItWorks } from "./How-It-Works";
import { PricingPreview } from "./Pricing-Preview";

export default function ForEducatorsPage() {
  return (
    <main className="mb-50">
      <Hero />
      <Benefits />
      <HowItWorks />
      <PricingPreview />
      <CTASection />
    </main>
  );
}