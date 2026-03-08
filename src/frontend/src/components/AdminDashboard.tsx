import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Check,
  Edit,
  Flower2,
  Loader2,
  LogOut,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import {
  useCreateProduct,
  useDeleteProduct,
  useGetAllProducts,
  useUpdateProduct,
} from "../hooks/useQueries";

interface AdminDashboardProps {
  passkey: string;
  onLogout: () => void;
}

type FormMode = "idle" | "add" | "edit";

const EMPTY_FORM: Omit<Product, "id"> = {
  name: "",
  description: "",
  imageUrl: "",
  price: 0,
  isBestseller: false,
};

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function AdminDashboard({
  passkey,
  onLogout,
}: AdminDashboardProps) {
  const { data: products = [], isLoading } = useGetAllProducts();

  const [formMode, setFormMode] = useState<FormMode>("idle");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, "id">>(EMPTY_FORM);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const isSaving = isCreating || isUpdating;

  const openAdd = () => {
    setFormData(EMPTY_FORM);
    setEditingProduct(null);
    setFormMode("add");
  };

  const openEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      isBestseller: product.isBestseller,
    });
    setEditingProduct(product);
    setFormMode("edit");
  };

  const closeForm = () => {
    setFormMode("idle");
    setEditingProduct(null);
    setFormData(EMPTY_FORM);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Product name is required.");
      return;
    }
    if (formData.price <= 0) {
      toast.error("Price must be greater than 0.");
      return;
    }

    if (formMode === "add") {
      const newProduct: Product = {
        id: generateId(),
        ...formData,
      };
      createProduct(
        { passkey, product: newProduct },
        {
          onSuccess: () => {
            toast.success(`"${formData.name}" added successfully!`);
            closeForm();
          },
          onError: () => {
            toast.error("Failed to add product. Please try again.");
          },
        },
      );
    } else if (formMode === "edit" && editingProduct) {
      const updatedProduct: Product = {
        id: editingProduct.id,
        ...formData,
      };
      updateProduct(
        { passkey, product: updatedProduct },
        {
          onSuccess: () => {
            toast.success(`"${formData.name}" updated successfully!`);
            closeForm();
          },
          onError: () => {
            toast.error("Failed to update product. Please try again.");
          },
        },
      );
    }
  };

  const handleDelete = (productId: string, productName: string) => {
    deleteProduct(
      { passkey, productId },
      {
        onSuccess: () => {
          toast.success(`"${productName}" deleted.`);
          setDeleteConfirmId(null);
        },
        onError: () => {
          toast.error("Failed to delete product. Please try again.");
        },
      },
    );
  };

  const handleLogout = () => {
    onLogout();
    toast.success("Logged out of admin panel.");
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.975 0.008 75)" }}
    >
      {/* Admin Header */}
      <header
        className="sticky top-0 z-40 border-b px-5 sm:px-8 py-4"
        style={{
          background: "oklch(0.985 0.006 80 / 0.95)",
          backdropFilter: "blur(8px)",
          borderColor: "oklch(0.88 0.012 70)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "oklch(0.93 0.018 15)" }}
            >
              <Flower2 size={16} style={{ color: "oklch(0.52 0.085 10)" }} />
            </div>
            <div>
              <h1 className="font-playfair text-lg sm:text-xl font-bold text-foreground leading-tight">
                Velvet Blooms Admin
              </h1>
              <p className="font-inter text-xs text-muted-foreground hidden sm:block">
                Product Management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {formMode !== "idle" && (
              <Button
                variant="outline"
                size="sm"
                onClick={closeForm}
                className="font-inter gap-1 text-xs rounded-full"
              >
                <ArrowLeft size={13} />
                Back
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="font-inter gap-1 text-xs rounded-full"
              style={{
                color: "oklch(0.45 0.06 10)",
                borderColor: "oklch(0.58 0.085 10 / 0.3)",
              }}
            >
              <LogOut size={13} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        {/* Product Form */}
        {formMode !== "idle" && (
          <div
            className="rounded-2xl p-6 sm:p-8 mb-8 border"
            style={{
              background: "oklch(0.985 0.006 80)",
              borderColor: "oklch(0.88 0.012 70)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            }}
          >
            <h2 className="font-playfair text-2xl font-bold text-foreground mb-6">
              {formMode === "add" ? "Add New Product" : "Edit Product"}
            </h2>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="prod-name"
                    className="font-inter text-sm font-medium"
                  >
                    Product Name *
                  </Label>
                  <Input
                    data-ocid="admin.product.input"
                    id="prod-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="e.g. Single Flower Bouquet"
                    className="font-inter h-11 rounded-xl"
                    style={{ fontSize: "16px" }}
                    required
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label
                    htmlFor="prod-price"
                    className="font-inter text-sm font-medium"
                  >
                    Price (₹) *
                  </Label>
                  <Input
                    data-ocid="admin.product.input"
                    id="prod-price"
                    type="number"
                    min="1"
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        price: Number.parseFloat(e.target.value) || 0,
                      }))
                    }
                    placeholder="e.g. 299"
                    className="font-inter h-11 rounded-xl"
                    style={{ fontSize: "16px" }}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="prod-desc"
                  className="font-inter text-sm font-medium"
                >
                  Description
                </Label>
                <Textarea
                  data-ocid="admin.product.textarea"
                  id="prod-desc"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe the product in 1-3 sentences..."
                  className="font-inter rounded-xl resize-none"
                  rows={3}
                  style={{ fontSize: "16px" }}
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label
                  htmlFor="prod-img"
                  className="font-inter text-sm font-medium"
                >
                  Image URL
                </Label>
                <Input
                  data-ocid="admin.product.input"
                  id="prod-img"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, imageUrl: e.target.value }))
                  }
                  placeholder="https://... or /assets/..."
                  className="font-inter h-11 rounded-xl"
                  style={{ fontSize: "16px" }}
                />
              </div>

              {/* Bestseller */}
              <div className="flex items-center gap-3">
                <Checkbox
                  data-ocid="admin.product.checkbox"
                  id="prod-bestseller"
                  checked={formData.isBestseller}
                  onCheckedChange={(checked) =>
                    setFormData((p) => ({
                      ...p,
                      isBestseller: checked === true,
                    }))
                  }
                />
                <Label
                  htmlFor="prod-bestseller"
                  className="font-inter text-sm text-foreground cursor-pointer"
                >
                  Mark as "Most Loved" bestseller
                </Label>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  data-ocid="admin.save_button"
                  type="submit"
                  disabled={isSaving}
                  className="font-inter font-semibold rounded-xl px-7 h-11"
                  style={{
                    background: "oklch(0.58 0.085 10)",
                    color: "white",
                  }}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check size={15} className="mr-2" />
                      {formMode === "add" ? "Add Product" : "Save Changes"}
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeForm}
                  className="font-inter rounded-xl px-5 h-11"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Product List Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-foreground">
              Products
            </h2>
            <p className="font-inter text-sm text-muted-foreground mt-1">
              {products.length} product{products.length !== 1 ? "s" : ""} in
              your store
            </p>
          </div>
          {formMode === "idle" && (
            <Button
              data-ocid="admin.add_button"
              onClick={openAdd}
              className="font-inter gap-2 rounded-xl px-5 h-10 text-sm font-semibold"
              style={{
                background: "oklch(0.58 0.085 10)",
                color: "white",
              }}
            >
              <Plus size={16} />
              Add Product
            </Button>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div data-ocid="admin.loading_state" className="space-y-3">
            {["al1", "al2", "al3"].map((key) => (
              <div
                key={key}
                className="h-20 rounded-xl bg-card border border-border animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && products.length === 0 && (
          <div
            data-ocid="admin.empty_state"
            className="text-center py-16 rounded-2xl border border-dashed"
            style={{ borderColor: "oklch(0.88 0.012 70)" }}
          >
            <Flower2
              size={40}
              className="mx-auto mb-3 opacity-30"
              style={{ color: "oklch(0.58 0.085 10)" }}
            />
            <p className="font-playfair text-lg text-foreground mb-1">
              No products yet
            </p>
            <p className="font-inter text-sm text-muted-foreground mb-5">
              Add your first product to get started.
            </p>
            <Button
              data-ocid="admin.add_button"
              onClick={openAdd}
              className="font-inter gap-2 rounded-xl px-6 h-10 text-sm"
              style={{ background: "oklch(0.58 0.085 10)", color: "white" }}
            >
              <Plus size={15} />
              Add First Product
            </Button>
          </div>
        )}

        {/* Product List */}
        {!isLoading && products.length > 0 && (
          <div className="space-y-3">
            {products.map((product, idx) => {
              const ocidIdx = idx + 1;
              const isConfirmingDelete = deleteConfirmId === product.id;
              return (
                <div
                  key={product.id}
                  data-ocid={`admin.product.item.${ocidIdx}`}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all"
                  style={{
                    background: "oklch(0.985 0.006 80)",
                    borderColor: isConfirmingDelete
                      ? "oklch(0.577 0.245 27.325 / 0.3)"
                      : "oklch(0.88 0.012 70)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Product Image thumbnail */}
                  <div
                    className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
                    style={{
                      background: "oklch(0.93 0.018 15)",
                    }}
                  >
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Flower2
                          size={20}
                          style={{ color: "oklch(0.58 0.085 10)" }}
                          className="opacity-50"
                        />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-inter text-sm font-semibold text-foreground truncate">
                        {product.name}
                      </h3>
                      {product.isBestseller && (
                        <Badge
                          className="font-inter text-xs px-2 py-0 border-0 rounded-full flex-shrink-0"
                          style={{
                            background: "oklch(0.93 0.018 15)",
                            color: "oklch(0.52 0.085 10)",
                          }}
                        >
                          Most Loved
                        </Badge>
                      )}
                    </div>
                    <p
                      className="font-inter text-sm font-bold mt-0.5"
                      style={{ color: "oklch(0.52 0.085 10)" }}
                    >
                      ₹{product.price}
                    </p>
                    {product.description && (
                      <p className="font-inter text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {isConfirmingDelete ? (
                      <>
                        <Button
                          data-ocid={`admin.delete_button.${ocidIdx}`}
                          size="sm"
                          disabled={isDeleting}
                          onClick={() => handleDelete(product.id, product.name)}
                          className="font-inter text-xs h-8 rounded-lg gap-1"
                          style={{
                            background: "oklch(0.577 0.245 27.325)",
                            color: "white",
                          }}
                        >
                          {isDeleting ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            "Confirm Delete"
                          )}
                        </Button>
                        <Button
                          data-ocid="admin.cancel_button"
                          size="sm"
                          variant="outline"
                          onClick={() => setDeleteConfirmId(null)}
                          className="font-inter text-xs h-8 rounded-lg"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          data-ocid={`admin.edit_button.${ocidIdx}`}
                          size="icon"
                          variant="outline"
                          onClick={() => openEdit(product)}
                          className="h-8 w-8 rounded-lg"
                          title="Edit product"
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          data-ocid={`admin.delete_button.${ocidIdx}`}
                          size="icon"
                          variant="outline"
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="h-8 w-8 rounded-lg"
                          style={{
                            color: "oklch(0.5 0.18 25)",
                            borderColor: "oklch(0.577 0.245 27.325 / 0.3)",
                          }}
                          title="Delete product"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
