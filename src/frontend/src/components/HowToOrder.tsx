import { MessageCircle, Search, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse",
    description:
      "Explore our 100% handmade chenille collection above. Each piece is unique — take your time to find the one that speaks to you.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Message",
    description:
      "Click the 'Order' button to chat with us on WhatsApp or Instagram (@Velvet.blooms__). We'll confirm your order and discuss delivery.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Customize",
    description:
      "Share a reference image for bespoke designs — a specific colour palette, size, or style. We craft to your exact vision with love.",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), index * 150);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const Icon = step.icon;

  return (
    <div
      ref={cardRef}
      className="fade-in-up flex flex-col items-center text-center p-7 sm:p-8 rounded-2xl relative"
      style={{
        background: "oklch(0.985 0.006 80)",
        border: "1px solid oklch(0.88 0.012 70 / 0.7)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Step number — background watermark */}
      <div
        className="absolute top-4 right-5 font-playfair font-bold text-6xl opacity-[0.06] select-none pointer-events-none"
        style={{ color: "oklch(0.58 0.085 10)" }}
        aria-hidden="true"
      >
        {step.number}
      </div>

      {/* Icon circle */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.93 0.018 15) 0%, oklch(0.97 0.008 75) 100%)",
          border: "1px solid oklch(0.88 0.012 70)",
        }}
      >
        <Icon size={22} style={{ color: "oklch(0.52 0.085 10)" }} />
      </div>

      {/* Step pill */}
      <span
        className="font-inter text-xs font-semibold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full"
        style={{
          background: "oklch(0.93 0.018 15)",
          color: "oklch(0.52 0.085 10)",
        }}
      >
        Step {step.number}
      </span>

      <h3 className="font-playfair text-2xl font-semibold text-foreground mb-3">
        {step.title}
      </h3>

      <p className="font-inter text-sm sm:text-base text-muted-foreground leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}

export default function HowToOrder() {
  return (
    <section
      data-ocid="how_to_order.section"
      className="py-20 sm:py-28 px-5 sm:px-8"
      style={{ background: "oklch(0.975 0.008 75)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-inter text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            Simple Process
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-4">
            How to Order
          </h2>
          <div className="section-divider mb-5" />
          <p className="font-inter text-base sm:text-lg text-muted-foreground max-w-lg mx-auto">
            Ordering your perfect bloom takes just three easy steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7">
          {steps.map((step, idx) => (
            <StepCard key={step.number} step={step} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
