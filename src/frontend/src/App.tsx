import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AdminSection from "./components/AdminSection";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HowToOrder from "./components/HowToOrder";
import InstagramStrip from "./components/InstagramStrip";
import OurStory from "./components/OurStory";
import ProductGrid from "./components/ProductGrid";
import Testimonials from "./components/Testimonials";

export default function App() {
  const [adminPasskey, setAdminPasskey] = useState<string | null>(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const handleAdminLogin = (passkey: string) => {
    setAdminPasskey(passkey);
    setShowAdminDashboard(true);
  };

  const handleAdminLogout = () => {
    setAdminPasskey(null);
    setShowAdminDashboard(false);
  };

  if (showAdminDashboard && adminPasskey) {
    return (
      <>
        <Toaster position="top-center" />
        <AdminDashboardWrapper
          passkey={adminPasskey}
          onLogout={handleAdminLogout}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Toaster position="top-center" />
      <HeroSection />
      <ProductGrid />
      <OurStory />
      <HowToOrder />
      <Testimonials />
      <InstagramStrip />
      <AdminSection onLogin={handleAdminLogin} />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

// Import AdminDashboard here to avoid circular refs
import AdminDashboard from "./components/AdminDashboard";

function AdminDashboardWrapper({
  passkey,
  onLogout,
}: {
  passkey: string;
  onLogout: () => void;
}) {
  return <AdminDashboard passkey={passkey} onLogout={onLogout} />;
}
