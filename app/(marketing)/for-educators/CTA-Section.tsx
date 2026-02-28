import { Button } from "components/ui/button";

export function CTASection() {
    return (
        <section className="px-6 py-24 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Equip Students With Skills That Last
            </h2>
            <p className="text-lg mb-8 text-slate-200">
                Start implementing structured soft skills education this semester.
            </p>
            <div className="flex justify-center gap-4">
                <Button size="lg" variant="primary" className="cursor-pointer">
                Start Free Trial
                </Button>
                <Button size="lg" variant="secondary" className="cursor-pointer">
                Contact Sales
                </Button>
            </div>
        </section>
    );
}