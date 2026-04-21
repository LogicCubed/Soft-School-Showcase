import { Button } from "components/ui/button";

export function PricingPreview() {
    return (
        <section className="px-6 py-20 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">
                Flexible Pricing for Schools
            </h2>
            <p className="text-slate-400 mb-8">
                Individual teacher plans or school-wide access with volume discounts.
            </p>
            <Button size="lg" variant="primary" className="cursor-pointer text-white">View Full Pricing</Button>
        </section>
    );
}