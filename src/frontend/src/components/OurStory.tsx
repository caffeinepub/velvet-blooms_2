import { useEffect, useRef } from "react";

export default function OurStory() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-ocid="story.section"
      className="py-20 sm:py-28 px-5 sm:px-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.93 0.018 15 / 0.35) 0%, oklch(0.975 0.008 75) 40%, oklch(0.91 0.022 155 / 0.2) 100%)",
      }}
    >
      {/* Decorative petal shapes */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.58 0.085 10) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-8 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.045 155) 0%, transparent 70%)",
          transform: "translate(-40%, 40%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative">
        <div ref={contentRef} className="fade-in-up text-center">
          {/* Eyebrow */}
          <span className="font-inter text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            About Us
          </span>

          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Our Story
          </h2>

          <div className="section-divider mb-8" />

          {/* Decorative quote mark */}
          <div
            className="font-playfair text-7xl leading-none mb-4 opacity-20 select-none"
            style={{ color: "oklch(0.58 0.085 10)" }}
            aria-hidden="true"
          >
            ❝
          </div>

          <p className="font-inter text-lg sm:text-xl leading-[1.85] text-foreground/80 max-w-2xl mx-auto">
            Velvet Blooms was born from a love of handcraft and beauty. Every
            bouquet you see is made at home, petal by petal, with chenille yarn
            and care.
          </p>

          <div
            className="my-8 h-px max-w-xs mx-auto"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.58 0.085 10 / 0.3), transparent)",
            }}
          />

          <p className="font-inter text-lg sm:text-xl leading-[1.85] text-foreground/80 max-w-2xl mx-auto">
            We believe flowers should last forever — so we make them to.{" "}
            <span
              className="font-playfair italic font-medium"
              style={{ color: "oklch(0.52 0.085 10)" }}
            >
              Based in Mumbai, crafted with love.
            </span>
          </p>

          {/* Signature flourish */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <div
              className="h-px w-16"
              style={{ background: "oklch(0.58 0.085 10 / 0.4)" }}
            />
            <span
              className="font-playfair italic text-xl"
              style={{ color: "oklch(0.58 0.085 10)" }}
            >
              Velvet Blooms
            </span>
            <div
              className="h-px w-16"
              style={{ background: "oklch(0.58 0.085 10 / 0.4)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
