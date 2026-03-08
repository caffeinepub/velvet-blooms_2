import { Star } from "lucide-react";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Aisha K.",
    location: "Mumbai",
    review:
      "Absolutely stunning! The chenille bouquet I ordered looked even more beautiful in person. The texture, the colors — everything was perfect. Will definitely order again.",
    avatar: "AK",
  },
  {
    name: "Priya M.",
    location: "Pune",
    review:
      "I gifted this to my mom and she cried happy tears. The quality is unbelievable for the price. You can feel the love in every single petal.",
    avatar: "PM",
  },
  {
    name: "Ritu S.",
    location: "Delhi",
    review:
      "Fast delivery, gorgeous packaging, and the flowers are perfect. Velvet Blooms is my go-to gifting brand now. Ordered three times already!",
    avatar: "RS",
  },
  {
    name: "Neha T.",
    location: "Bengaluru",
    review:
      "Ordered a custom bouquet and it was exactly what I envisioned. So much love and detail in every petal. The response was so quick and friendly too.",
    avatar: "NT",
  },
];

const avatarColors = [
  "oklch(0.72 0.085 10)",
  "oklch(0.55 0.045 155)",
  "oklch(0.65 0.07 320)",
  "oklch(0.62 0.07 65)",
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), index * 100);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="fade-in-up flex flex-col p-6 sm:p-7 rounded-2xl relative overflow-hidden"
      style={{
        background: "oklch(0.985 0.006 80)",
        border: "1px solid oklch(0.88 0.012 70 / 0.6)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.055)",
      }}
    >
      {/* Decorative quote */}
      <div
        className="absolute top-4 right-5 font-playfair text-5xl opacity-[0.08] select-none pointer-events-none leading-none"
        style={{ color: "oklch(0.58 0.085 10)" }}
        aria-hidden="true"
      >
        ❞
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {["st1", "st2", "st3", "st4", "st5"].map((key) => (
          <Star
            key={key}
            size={16}
            fill="oklch(0.78 0.12 65)"
            style={{ color: "oklch(0.78 0.12 65)" }}
          />
        ))}
      </div>

      {/* Review text */}
      <p className="font-inter text-sm sm:text-base text-foreground/80 leading-relaxed flex-1 italic mb-5">
        "{testimonial.review}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: avatarColors[index % avatarColors.length] }}
        >
          <span className="font-inter text-xs font-bold text-white">
            {testimonial.avatar}
          </span>
        </div>
        <div>
          <p className="font-inter text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="font-inter text-xs text-muted-foreground">
            {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      data-ocid="testimonials.section"
      className="py-20 sm:py-28 px-5 sm:px-8"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.975 0.008 75) 0%, oklch(0.955 0.01 15 / 0.4) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-inter text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            Loved by Customers
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <div className="section-divider mb-5" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={t.name} testimonial={t} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
