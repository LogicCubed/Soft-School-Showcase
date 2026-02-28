export function HowItWorks() {
    const steps = [
        {
            step: "1",
            title: "Create a Class",
            description: "Set up your classroom and invite students with a simple code.",
        },
        {
            step: "2",
            title: "Assign Lessons",
            description: "Choose soft skill modules and assign them to individuals or groups.",
        },
        {
            step: "3",
            title: "Track Progress",
            description: "Monitor participation, completion rates, and skill development.",
        },
    ];

    return (
        <section className="px-6 py-20 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-10">
                {steps.map((step) => (
                    <div key={step.step}>
                        <div className="text-2xl font-bold mb-4">{step.step}. {step.title}</div>
                        <p className="text-slate-400">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}