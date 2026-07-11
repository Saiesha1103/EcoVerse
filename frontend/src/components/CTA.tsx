import { motion } from "framer-motion";
import { FadeInSection, PrimaryButton, SecondaryButton } from "./ui";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-32">
      <motion.div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(34,197,94,0.16),transparent_70%)]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="grid-overlay absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_75%)]" />

      <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
        <FadeInSection>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Ready to simulate an entire ecosystem?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
            Spin up an environment, spawn intelligent agents, and watch the
            graph respond in real time.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton href="/simulation">Launch Simulation</PrimaryButton>
            <SecondaryButton href="https://github.com">
              GitHub Repository
            </SecondaryButton>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
