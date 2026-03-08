import { Instagram } from "lucide-react";
import { useEffect, useRef } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/velvet.blooms__";

const instaItems = [
  {
    id: "ig1",
    pattern: "✿",
    gradient:
      "linear-gradient(135deg, oklch(0.88 0.04 15) 0%, oklch(0.93 0.02 15) 50%, oklch(0.97 0.008 75) 100%)",
  },
  {
    id: "ig2",
    pattern: "❀",
    gradient:
      "linear-gradient(135deg, oklch(0.9 0.025 155) 0%, oklch(0.93 0.015 100) 50%, oklch(0.96 0.01 75) 100%)",
  },
  {
    id: "ig3",
    pattern: "✾",
    gradient:
      "linear-gradient(135deg, oklch(0.92 0.03 50) 0%, oklch(0.94 0.02 25) 50%, oklch(0.97 0.008 75) 100%)",
  },
  {
    id: "ig4",
    pattern: "✤",
    gradient:
      "linear-gradient(135deg, oklch(0.87 0.035 15) 0%, oklch(0.91 0.025 350) 50%, oklch(0.95 0.012 75) 100%)",
  },
  {
    id: "ig5",
    pattern: "✦",
    gradient:
      "linear-gradient(135deg, oklch(0.89 0.028 155) 0%, oklch(0.92 0.02 120) 50%, oklch(0.97 0.008 75) 100%)",
  },
  {
    id: "ig6",
    pattern: "❃",
    gradient:
      "linear-gradient(135deg, oklch(0.9 0.022 30) 0%, oklch(0.93 0.018 15) 50%, oklch(0.96 0.01 75) 100%)",
  },
];

export default function InstagramStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-ocid="instagram.section"
      className="py-20 sm:py-28 px-5 sm:px-8"
      style={{ background: "oklch(0.975 0.008 75)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={sectionRef} className="fade-in-up text-center mb-10 sm:mb-12">
          <span className="font-inter text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            Follow Along
          </span>
          <div className="flex items-center justify-center gap-3 mb-3">
            <Instagram size={28} style={{ color: "oklch(0.52 0.085 10)" }} />
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground">
              Find Us on Instagram
            </h2>
          </div>
          <div className="section-divider mb-5" />
          <p className="font-inter text-base sm:text-lg text-muted-foreground">
            Follow{" "}
            <a
              data-ocid="instagram.link"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline transition-all"
              style={{ color: "oklch(0.52 0.085 10)" }}
            >
              @Velvet.blooms__
            </a>{" "}
            for new arrivals, behind-the-scenes, and daily blooms.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8 sm:mb-10">
          {instaItems.map((item, idx) => (
            <a
              key={item.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-xl overflow-hidden group"
              style={{ background: item.gradient }}
              aria-label={`Instagram post ${idx + 1}`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                <span
                  className="text-4xl sm:text-5xl select-none"
                  style={{ color: "oklch(0.52 0.085 10)" }}
                >
                  {item.pattern}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Instagram size={20} className="text-white" />
              </div>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide border transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              color: "oklch(0.52 0.085 10)",
              borderColor: "oklch(0.58 0.085 10 / 0.4)",
              background: "oklch(0.93 0.018 15 / 0.4)",
            }}
          >
            <Instagram size={16} />
            Follow Us @Velvet.blooms__
          </a>
        </div>
      </div>
    </section>
  );
}
