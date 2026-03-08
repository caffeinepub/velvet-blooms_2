import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      data-ocid="footer.section"
      className="py-10 sm:py-12 px-5 sm:px-8 border-t"
      style={{
        background: "oklch(0.22 0.012 50)",
        borderColor: "oklch(0.88 0.012 70 / 0.1)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Brand name */}
        <div className="text-center mb-6">
          <span
            className="font-playfair text-2xl sm:text-3xl font-bold italic tracking-wide"
            style={{ color: "oklch(0.93 0.018 15)" }}
          >
            Velvet Blooms
          </span>
        </div>

        {/* Divider */}
        <div
          className="h-px max-w-xs mx-auto mb-6"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.58 0.085 10 / 0.4), transparent)",
          }}
        />

        {/* Tagline */}
        <div className="text-center space-y-2">
          <p
            className="font-inter text-sm flex items-center justify-center gap-2"
            style={{ color: "oklch(0.75 0.018 55)" }}
          >
            <Heart
              size={14}
              fill="oklch(0.72 0.085 10)"
              style={{ color: "oklch(0.72 0.085 10)" }}
            />
            Made with love and care, based in Mumbai
            <Heart
              size={14}
              fill="oklch(0.72 0.085 10)"
              style={{ color: "oklch(0.72 0.085 10)" }}
            />
          </p>

          <p
            className="font-inter text-xs"
            style={{ color: "oklch(0.52 0.012 55)" }}
          >
            © {year} Velvet Blooms. Handcrafted chenille blooms that last
            forever.
          </p>

          {/* Caffeine attribution */}
          <p
            className="font-inter text-xs pt-2"
            style={{ color: "oklch(0.4 0.012 55)" }}
          >
            Built with{" "}
            <Heart
              size={11}
              className="inline"
              fill="oklch(0.58 0.085 10)"
              style={{ color: "oklch(0.58 0.085 10)" }}
            />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors"
              style={{ color: "oklch(0.55 0.085 10)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
