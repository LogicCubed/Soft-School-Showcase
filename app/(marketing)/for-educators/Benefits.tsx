export function Benefits() {
  const items = [
    {
      title: "Curriculum-Aligned",
      description: "Pre-built lessons mapped to communication, leadership, and collaboration standards.",
    },
    {
      title: "Minimal Prep Time",
      description: "Ready-to-run lessons with guided activities and built-in reflection prompts.",
    },
    {
      title: "Engaging Format",
      description: "Interactive challenges that keep students participating, not passively consuming.",
    },
  ];

  return (
        <section className="px-6 py-20">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                {items.map((item) => (
                <div key={item.title}>
                    <h3 className="text-2xl font-semibold mb-3 text-white">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                </div>
                ))}
            </div>
        </section>
    );
}