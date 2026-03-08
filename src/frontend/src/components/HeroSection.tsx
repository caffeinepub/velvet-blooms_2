import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const arrowRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const arrow = arrowRef.current;
    if (!arrow) return;
    let frame: number;
    let pos = 0;
    const animate = () => {
      pos = (pos + 0.03) % (Math.PI * 2);
      arrow.style.transform = `translateY(${Math.sin(pos) * 6}px)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const scrollToCollection = () => {
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-ocid="hero.section"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-bouquet.dim_1600x900.jpg')",
        }}
        role="img"
        aria-label="Handcrafted chenille flower bouquet"
      />

      {/* Gradient Overlay: bottom-to-top dark layer for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(20,12,8,0.82) 0%, rgba(20,12,8,0.55) 40%, rgba(20,12,8,0.3) 70%, rgba(20,12,8,0.15) 100%)",
        }}
      />

      {/* Subtle top vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10, 6, 4, 0.3) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-10 max-w-4xl mx-auto">
        {/* Tagline pill */}
        <div className="inline-flex items-center gap-2 mb-6 sm:mb-8">
          <div className="h-px w-10 sm:w-16 bg-white/50" />
          <span className="font-inter text-xs sm:text-sm tracking-[0.25em] uppercase text-white/75 font-medium">
            Handmade with Love
          </span>
          <div className="h-px w-10 sm:w-16 bg-white/50" />
        </div>

        {/* Main Heading */}
        <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight mb-5 sm:mb-7 hero-text-shadow">
          Handcrafted Blooms
          <br />
          <span
            className="italic font-normal"
            style={{ color: "oklch(0.9 0.04 15)" }}
          >
            That Last Forever
          </span>
        </h1>

        {/* Divider line */}
        <div className="flex items-center justify-center gap-3 mb-5 sm:mb-7">
          <div className="h-px w-12 bg-white/40" />
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "oklch(0.85 0.06 15)" }}
          />
          <div className="h-px w-12 bg-white/40" />
        </div>

        {/* Sub-heading */}
        <p
          className="font-inter text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
        >
          Every petal made by hand, at home, with love and care.{" "}
          <span className="text-white/75">
            Browse our collection or message us for custom requests.
          </span>
        </p>

        {/* CTA Button */}
        <button
          data-ocid="hero.primary_button"
          type="button"
          onClick={scrollToCollection}
          className="font-inter inline-flex items-center gap-2 px-8 py-4 text-sm sm:text-base font-semibold tracking-wider uppercase rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "oklch(0.58 0.085 10)",
            color: "white",
            boxShadow: "0 8px 32px rgba(180, 80, 80, 0.4)",
            letterSpacing: "0.1em",
          }}
        >
          View Collection
        </button>
      </div>

      {/* Scroll down indicator */}
      <button
        type="button"
        ref={arrowRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer bg-transparent border-0 p-0"
        onClick={scrollToCollection}
        aria-label="Scroll to collection"
      >
        <ChevronDown
          className="text-white/70 hover:text-white transition-colors"
          size={32}
          strokeWidth={1.5}
        />
      </button>
    </section>
  );
}
