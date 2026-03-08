import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useVerifyPasskey } from "../hooks/useQueries";

interface AdminSectionProps {
  onLogin: (passkey: string) => void;
}

export default function AdminSection({ onLogin }: AdminSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const { mutate: verifyPasskey, isPending } = useVerifyPasskey();

  const handleOpen = () => {
    setModalOpen(true);
    setPasskey("");
    setError("");
  };

  const handleClose = () => {
    setModalOpen(false);
    setPasskey("");
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setError("Please enter the admin passkey.");
      return;
    }
    setError("");
    verifyPasskey(passkey, {
      onSuccess: (isValid) => {
        if (isValid) {
          toast.success("Welcome back! Admin panel unlocked.");
          handleClose();
          onLogin(passkey);
        } else {
          setError("Incorrect passkey. Please try again.");
        }
      },
      onError: () => {
        setError("Something went wrong. Please try again.");
      },
    });
  };

  return (
    <section
      className="py-12 sm:py-16 px-5 sm:px-8 text-center"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.975 0.008 75) 0%, oklch(0.96 0.012 15 / 0.2) 100%)",
      }}
    >
      <div className="max-w-sm mx-auto">
        <Button
          data-ocid="admin.open_modal_button"
          onClick={handleOpen}
          variant="outline"
          className="font-inter gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-all hover:scale-105"
          style={{
            borderColor: "oklch(0.58 0.085 10 / 0.3)",
            color: "oklch(0.45 0.06 10)",
            background: "oklch(0.97 0.006 75)",
          }}
        >
          <Lock size={15} />
          Admin Panel
        </Button>
        <p className="font-inter text-xs text-muted-foreground mt-3">
          Product management — authorized access only
        </p>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          data-ocid="admin.dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") handleClose();
          }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-7 sm:p-8 relative"
            aria-labelledby="admin-dialog-title"
            style={{
              background: "oklch(0.985 0.006 80)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
              border: "1px solid oklch(0.88 0.012 70)",
            }}
          >
            {/* Close button */}
            <button
              data-ocid="admin.cancel_button"
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors hover:bg-muted"
              aria-label="Close admin login"
            >
              <X size={16} />
            </button>

            {/* Icon */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{
                background: "oklch(0.93 0.018 15)",
              }}
            >
              <Lock size={20} style={{ color: "oklch(0.52 0.085 10)" }} />
            </div>

            <h2
              id="admin-dialog-title"
              className="font-playfair text-2xl font-bold text-center text-foreground mb-1"
            >
              Admin Access
            </h2>
            <p className="font-inter text-sm text-center text-muted-foreground mb-7">
              Enter your passkey to manage products
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="admin-passkey"
                  className="font-inter text-sm font-medium text-foreground"
                >
                  Enter Admin Passkey
                </Label>
                <Input
                  data-ocid="admin.input"
                  id="admin-passkey"
                  type="password"
                  placeholder="Enter passkey..."
                  value={passkey}
                  onChange={(e) => {
                    setPasskey(e.target.value);
                    if (error) setError("");
                  }}
                  autoFocus
                  autoComplete="current-password"
                  className="font-inter h-11 rounded-xl border-border focus:border-primary"
                  style={{ fontSize: "16px" }}
                />
              </div>

              {/* Error */}
              {error && (
                <p
                  data-ocid="admin.error_state"
                  className="font-inter text-sm rounded-lg px-3 py-2"
                  style={{
                    color: "oklch(0.5 0.18 25)",
                    background: "oklch(0.95 0.02 25)",
                  }}
                  role="alert"
                >
                  {error}
                </p>
              )}

              <Button
                data-ocid="admin.submit_button"
                type="submit"
                disabled={isPending}
                className="w-full h-11 rounded-xl font-inter font-semibold text-sm transition-all"
                style={{
                  background: "oklch(0.58 0.085 10)",
                  color: "white",
                }}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
