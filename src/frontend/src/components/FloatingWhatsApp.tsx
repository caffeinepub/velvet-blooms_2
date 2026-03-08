import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const url =
    "https://wa.me/919653203320?text=Hi!%20I%20have%20a%20custom%20inquiry%20for%20Velvet%20Blooms";

  return (
    <a
      data-ocid="whatsapp.button"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-7 z-50 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-bloom"
      style={{
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        boxShadow: "0 6px 24px rgba(37, 211, 102, 0.5)",
      }}
    >
      <MessageCircle size={26} className="text-white" fill="white" />
    </a>
  );
}
