import { motion } from "framer-motion";
import { ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export function PrimaryButton({
  children,
  href = "#",
  icon = true,
}: {
  children: ReactNode;
  href?: string;
  icon?: boolean;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-[#04140B] shadow-glow"
    >
      <span className="relative z-10">{children}</span>
      {icon && (
        <FiArrowUpRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-shimmer" />
    </motion.a>
  );
}

export function SecondaryButton({
  children,
  href = "#",
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-primary/40"
    >
      {children}
    </motion.a>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="section-eyebrow mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase text-primary">
      <span className="h-px w-6 bg-primary/70" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`glass rounded-2xl p-6 transition-shadow duration-300 hover:shadow-glow ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function FadeInSection({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
