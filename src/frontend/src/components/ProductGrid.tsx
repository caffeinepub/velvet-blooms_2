import { Badge } from "@/components/ui/badge";
import { Flower2, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Product } from "../backend.d";
import { useGetAllProducts } from "../hooks/useQueries";

// Default products displayed when backend hasn't loaded yet or is empty
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Single Flower Bouquet",
    price: 99,
    description:
      "A delicate single chenille flower, handcrafted with love. Perfect for everyday gifting or as a sweet reminder that someone is thinking of you.",
    imageUrl: "",
    isBestseller: false,
  },
  {
    id: "2",
    name: "Double Flower Bouquet",
    price: 199,
    description:
      "Two beautifully paired chenille blooms in complementary hues. A charming gift for close friends and loved ones that lasts forever.",
    imageUrl: "",
    isBestseller: false,
  },
  {
    id: "3",
    name: "Triple Flower Bouquet",
    price: 299,
    description:
      "Three handcrafted chenille flowers in a harmonious trio. An elegant arrangement for anniversaries, birthdays, or just because.",
    imageUrl: "",
    isBestseller: false,
  },
  {
    id: "4",
    name: "Five Flower Bouquet",
    price: 499,
    description:
      "A lush bouquet of five chenille blooms in assorted tones. A generous and heartfelt gift that brings lasting joy to any room.",
    imageUrl: "",
    isBestseller: true,
  },
  {
    id: "5",
    name: "Seven Flower Bouquet",
    price: 699,
    description:
      "Our most opulent bouquet — seven full chenille blooms in a rich palette. A statement gift for the most special occasions in life.",
    imageUrl: "",
    isBestseller: true,
  },
  {
    id: "6",
    name: "Evil Eye Pot",
    price: 649,
    description:
      "A charming hand-decorated pot featuring the iconic evil eye motif, adorned with soft chenille flowers. Beautiful and protective — a unique keepsake.",
    imageUrl: "",
    isBestseller: false,
  },
  {
    id: "7",
    name: "Single Sunflower",
    price: 249,
    description:
      "A bold, cheerful chenille sunflower with golden petals and a velvety dark centre. Brings warmth and brightness to any space, forever.",
    imageUrl: "",
    isBestseller: false,
  },
  {
    id: "8",
    name: "Single Rose (Various Colors)",
    price: 199,
    description:
      "A classic handcrafted chenille rose available in a range of colours — blush, red, white, or mauve. Timeless romance that never wilts.",
    imageUrl: "",
    isBestseller: true,
  },
  {
    id: "9",
    name: "Small Beautiful Pots",
    price: 149,
    description:
      "Tiny decorative pots filled with miniature chenille flowers. Sweet, compact, and endlessly giftable — perfect for desks and windowsills.",
    imageUrl: "",
    isBestseller: false,
  },
  {
    id: "10",
    name: "Small Sunflower",
    price: 99,
    description:
      "A petite version of our beloved sunflower, handcrafted with the same love and detail. Affordable, adorable, and absolutely charming.",
    imageUrl: "",
    isBestseller: false,
  },
];

function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger delay based on index
          const delay = (index % 3) * 100;
          setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const whatsappUrl = `https://wa.me/919653203320?text=Hi!%20I%20am%20interested%20in%20ordering%20the%20${encodeURIComponent(product.name)}`;
  const ocidIndex = index + 1;

  return (
    <div
      ref={cardRef}
      data-ocid={`product.item.${ocidIndex}`}
      className="fade-in-up product-card-hover bg-card rounded-2xl overflow-hidden border border-border/60 flex flex-col group"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-accent">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.93 0.018 15) 0%, oklch(0.975 0.008 75) 50%, oklch(0.88 0.025 155) 100%)",
            }}
          >
            <Flower2
              className="opacity-30 mb-2"
              size={48}
              style={{ color: "oklch(0.58 0.085 10)" }}
            />
            <span
              className="font-inter text-xs opacity-40"
              style={{ color: "oklch(0.58 0.085 10)" }}
            >
              Photo coming soon
            </span>
          </div>
        )}

        {/* Bestseller Badge */}
        {product.isBestseller && (
          <div className="absolute top-3 left-3">
            <Badge
              className="font-inter text-xs font-semibold px-3 py-1 border-0 rounded-full"
              style={{
                background: "oklch(0.58 0.085 10)",
                color: "white",
                boxShadow: "0 2px 8px rgba(180, 80, 80, 0.3)",
              }}
            >
              ✦ Most Loved
            </Badge>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-2">
        {/* Name */}
        <h3 className="font-playfair text-lg sm:text-xl font-semibold text-foreground leading-snug">
          {product.name}
        </h3>

        {/* Price */}
        <p
          className="font-inter text-xl font-bold"
          style={{ color: "oklch(0.52 0.085 10)" }}
        >
          ₹{product.price}
        </p>

        {/* Description */}
        <p className="font-inter text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
          {product.description}
        </p>

        {/* WhatsApp Order Button */}
        <a
          data-ocid={`product.order_button.${ocidIndex}`}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 font-inter inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
          style={{
            background: "oklch(0.58 0.085 10)",
            color: "white",
            boxShadow: "0 4px 16px rgba(180, 80, 80, 0.25)",
          }}
        >
          <MessageCircle size={16} />
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const { data: products, isLoading } = useGetAllProducts();

  // Use fetched products if available and non-empty, else use defaults
  const displayProducts =
    products && products.length > 0 ? products : DEFAULT_PRODUCTS;

  return (
    <section
      id="collection"
      data-ocid="collection.section"
      className="py-20 sm:py-28 px-5 sm:px-8"
      style={{ background: "oklch(0.975 0.008 75)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-inter text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            Handcrafted Collection
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our Collection
          </h2>
          <div className="section-divider mb-5" />
          <p className="font-inter text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Every piece is made by hand, petal by petal, with genuine care and
            craft.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div
            data-ocid="collection.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
          >
            {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((key) => (
              <div
                key={key}
                className="bg-card rounded-2xl overflow-hidden border border-border/60 animate-pulse"
              >
                <div className="aspect-square bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-4/5" />
                  <div className="h-11 bg-muted rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {displayProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && displayProducts.length === 0 && (
          <div data-ocid="collection.empty_state" className="text-center py-20">
            <Flower2
              size={48}
              className="mx-auto mb-4 opacity-30"
              style={{ color: "oklch(0.58 0.085 10)" }}
            />
            <p className="font-inter text-muted-foreground">
              No products yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
