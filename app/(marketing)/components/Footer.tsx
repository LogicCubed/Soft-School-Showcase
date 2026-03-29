const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10z"/>
        <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
        <circle cx="17.5" cy="6.5" r="1.2"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M16 3c.6 1.9 2 3.4 4 3.9V10c-1.7-.1-3.3-.7-4.7-1.7v6.1a6 6 0 11-6-6c.3 0 .7 0 1 .1v2.8a3 3 0 103 3V3h2.7z"/>
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.6.8-2.5.9A3.6 3.6 0 0012 8.4c0 .3 0 .6.1.9-3-.1-5.7-1.6-7.5-3.9-.3.6-.5 1.2-.5 1.9 0 1.3.7 2.5 1.8 3.2-.6 0-1.2-.2-1.7-.5v.1c0 1.9 1.3 3.5 3.1 3.8-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.6 2 2.7 3.8 2.8A7.3 7.3 0 012 19.3 10.3 10.3 0 007.6 21c6.5 0 10.1-5.4 10.1-10.1v-.5c.7-.5 1.4-1.2 1.9-2z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M23 7.5s-.2-1.7-.8-2.4c-.8-.9-1.7-.9-2.1-1C17.1 4 12 4 12 4s-5.1 0-8.1.1c-.4.1-1.3.1-2.1 1C1.2 5.8 1 7.5 1 7.5S.8 9.4.8 11.3v1.4C.8 14.6 1 16.5 1 16.5s.2 1.7.8 2.4c.8.9 1.9.9 2.4 1C6.9 20 12 20 12 20s5.1 0 8.1-.1c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.4.8-2.4s.2-1.9.2-3.8v-1.4c0-1.9-.2-3.8-.2-3.8zM10 14.5v-5l5 2.5-5 2.5z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M4 3a2 2 0 100 4 2 2 0 000-4zM3 8h2v13H3V8zm6 0h2v2c.6-1 1.8-2 3.8-2 4 0 4.2 2.5 4.2 5.8V21h-2v-6.5c0-1.6 0-3.7-2.5-3.7s-2.9 1.9-2.9 3.6V21H9V8z"/>
      </svg>
    ),
  },
];

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
                    fill="#00bcff"
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
                    <li><a href="courses" className="text-white/80 hover:text-white transition-colors">Courses</a></li>
                    <li><a href="mission" className="text-white/80 hover:text-white transition-colors">Mission</a></li>
                    <li><a href="contact-us" className="text-white/80 hover:text-white transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                <div className="flex-1 min-w-37.5">
                    <h3 className="font-extrabold text-2xl mb-4 text-white/80">Help and Support</h3>
                    <ul className="space-y-2 text-lg font-bold">
                    <li><a href="help" className="text-white/80 hover:text-white transition-colors">Soft School FAQs</a></li>
                    </ul>
                </div>

                <div className="flex-1 min-w-37.5">
                    <h3 className="font-extrabold text-2xl mb-4 text-white/80">Privacy and Terms</h3>
                    <ul className="space-y-2 text-lg font-bold">
                    <li><a href="guidelines" className="text-white/80 hover:text-white transition-colors">Community Guidelines</a></li>
                    <li><a href="terms" className="text-white/80 hover:text-white transition-colors">Terms</a></li>
                    <li><a href="privacy" className="text-white/80 hover:text-white transition-colors">Privacy</a></li>
                    </ul>
                </div>

                <div className="flex-1 min-w-37.5">
                    <h3 className="font-extrabold text-2xl mb-4 text-white/80">Social</h3>
                    <ul className="space-y-2 text-lg font-bold">
                        {socialLinks.map((social) => (
                            <li key={social.name}>
                            <a
                                href={social.href}
                                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                            >
                                {social.icon}
                                {social.name}
                            </a>
                            </li>
                        ))}
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