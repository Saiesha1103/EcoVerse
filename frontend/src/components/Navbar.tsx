import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiHexagon } from "react-icons/fi";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Technology", href: "#technology" },
  { label: "Documentation", href: "#documentation" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6"
    >
      <nav
        className={`glass flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.35)]" : ""
        }`}
      >
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-background">
            <FiHexagon className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] font-bold tracking-tight text-ink">
            EcoVerse
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <FiGithub className="h-4 w-4" />
            GitHub
          </a>
        </div>

        <motion.a
          href="/simulation"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-[#04140B] shadow-glow sm:px-5 sm:py-2.5 sm:text-sm"
        >
          Launch Simulation
        </motion.a>
      </nav>
    </motion.header>
  );
}
