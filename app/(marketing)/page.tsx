import { FeatureCard } from "./components/FeatureCard";
import { HeroSection } from "./components/HeroSection";

export default function LandingPage() {
    return (
        <>
            <HeroSection
                artSrc="/assets/characters/softy/art/hero.png"
                title1="Real Skills."
                title2="Real Scenarios."
                subtitle="Master real-world soft skills through bite-sized lessons, games, puzzles, and AI powered simulations."
            />

            {/* Featured Section */}
            <div className="mt-50 mb-50 flex flex-col items-center gap-25">
                <FeatureCard
                    artSrc="/assets/characters/sprout/sprout.svg"
                    title="learn. act. grow."
                    text="Master real-world soft skills through bite-sized lessons, games, puzzles, and AI powered simulations that make practice engaging and measurable"
                />
                <FeatureCard
                    artSrc="/assets/logos/soft-school-logo.svg"
                    title="built for results"
                    text="Our curriculum is aligned with the CASEL framework, grounding every lesson in research-backed social and emotional learning competencies"
                    reverse
                />
                <FeatureCard
                    artSrc="/assets/logos/soft-school-logo.svg"
                    title="stay on track"
                    text="Build momentum with streaks, unlock achievements, earn rewards, and customize your experience as you progress"
                />
                <FeatureCard
                    artSrc="/assets/logos/soft-school-logo.svg"
                    title="personalized for you"
                    text="AI-driven simulations adapt to your level and progress, helping you practice exactly what you need, at your own pace"
                    reverse
                />
            </div>
        </>
    );
}