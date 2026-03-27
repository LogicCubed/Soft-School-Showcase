import { AlertTriangle, TrendingUp, Users } from "lucide-react";

export function ProofSection() {
    return (
        <section className="relative w-full py-28">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/assets/images/collaboration.jpg')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 text-white text-center">
                <h2 className="text-4xl opacity-80 font-bold mb-6">
                    Soft skills drive career success
                </h2>

                <p className="text-lg opacity-60 mb-16">
                    Employers consistently rank communication, teamwork, and adaptability among the most critical skills in the modern workforce.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    
                    <div className="flex flex-col items-center">
                        <Users size={40} strokeWidth={3} className="mb-4 opacity-80" />
                        <p className="text-5xl opacity-80 font-bold">73%</p>
                        <p className="opacity-60 mt-2 text-sm max-w-xs">
                            of employers report difficulty finding graduates with sufficient soft skills
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <TrendingUp size={40} strokeWidth={3} className="mb-4 opacity-80" />
                        <p className="text-5xl opacity-80 font-bold">7 / 10</p>
                        <p className="opacity-60 mt-2 text-sm max-w-xs">
                            of top skills for the future are soft skills
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <AlertTriangle size={40} strokeWidth={3} className="mb-4 opacity-80" />
                        <p className="text-5xl opacity-80 font-bold">90%</p>
                        <p className="opacity-60 mt-2 text-sm max-w-xs">
                            of hiring failures are linked to soft skill gaps
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}