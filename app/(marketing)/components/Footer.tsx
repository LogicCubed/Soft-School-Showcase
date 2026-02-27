export const Footer = () => {
    return (
        <footer className="relative bg-sky-400 text-white">
            {/* Top wave */}
            <div className="absolute top-0 left-0 w-full overflow-visible leading-0 -translate-y-32 rotate-180">
                <svg
                className="w-full h-40"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                >
                <path
                    fill="#38bdf8"
                    fillOpacity="1"
                    d="M0,160L48,149.3C96,139,192,117,288,112C384,107,480,117,576,144C672,171,768,213,864,202.7C960,192,1056,128,1152,117.3C1248,107,1344,149,1392,170.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                />
                </svg>
            </div>

            <div className="relative z-10 py-16 px-6 max-w-7xl mx-auto">
                <div className="flex flex-wrap justify-between gap-10 text-center sm:text-left">
                <div className="flex-1 min-w-37.5">
                    <h3 className="font-extrabold text-2xl mb-4 text-white/80">About Us</h3>
                    <ul className="space-y-2 text-lg font-bold">
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Courses</a></li>
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Mission</a></li>
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                <div className="flex-1 min-w-37.5">
                    <h3 className="font-extrabold text-2xl mb-4 text-white/80">Help and Support</h3>
                    <ul className="space-y-2 text-lg font-bold">
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Soft School FAQs</a></li>
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Schools FAQs</a></li>
                    </ul>
                </div>

                <div className="flex-1 min-w-37.5">
                    <h3 className="font-extrabold text-2xl mb-4 text-white/80">Privacy and Terms</h3>
                    <ul className="space-y-2 text-lg font-bold">
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Community Guidelines</a></li>
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Terms</a></li>
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Privacy</a></li>
                    </ul>
                </div>

                <div className="flex-1 min-w-37.5">
                    <h3 className="font-extrabold text-2xl mb-4 text-white/80">Social</h3>
                    <ul className="space-y-2 text-lg font-bold">
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Instagram</a></li>
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Facebook</a></li>
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">TikTok</a></li>
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">Twitter</a></li>
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">YouTube</a></li>
                    <li><a href="#" className="text-white/80 hover:text-white transition-colors">LinkedIn</a></li>
                    </ul>
                </div>
                </div>

                <div className="mt-12 text-center text-lg font-extrabold text-white/80">
                    &copy; {new Date().getFullYear()} Soft School. All rights reserved.
                </div>
            </div>
        </footer>
    );
};