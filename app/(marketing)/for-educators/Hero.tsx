import { Button } from "components/ui/button";

export function Hero() {
    return (
        <section className="px-6 py-24 text-center max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Bring Soft Skills Into Your Classroom
            </h1>
            <p className="text-lg text-slate-400 mb-8">
                Structured, interactive soft skills lessons designed for real classroom implementation.
            </p>
            <div className="flex justify-center gap-4">
                <Button size="lg" variant="primary" className="cursor-pointer text-white">Start Free Trial</Button>
                <Button size="lg" variant="secondary" className="cursor-pointer text-white">Request School Demo</Button>
            </div>
        </section>
    );
}