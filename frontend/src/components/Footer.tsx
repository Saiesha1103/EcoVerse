import { FiGithub, FiHexagon } from "react-icons/fi";

export default function Footer() {
  return (
    <footer id="documentation" className="relative border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between sm:px-8">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-background">
            <FiHexagon className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <span className="text-sm font-bold tracking-tight text-ink">
            EcoVerse
          </span>
        </a>

        <div className="flex items-center gap-6 text-sm text-muted">
          <a href="#documentation" className="hover:text-ink">
            Documentation
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-ink"
          >
            <FiGithub className="h-4 w-4" />
            GitHub
          </a>
          <span className="font-mono-data text-xs text-muted/70">v0.1.0</span>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl px-6 text-center text-xs text-muted/60 sm:px-8 sm:text-left">
        Made with care using React + FastAPI
      </div>
    </footer>
  );
}
