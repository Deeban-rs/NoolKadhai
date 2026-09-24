import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  X,
  AlertTriangle,
} from "lucide-react";
const CATEGORIES = [
  "Bridal Blouse",
  "Western Wear",
  "Custom Made",
  "Ethnic Wear",
  "Designer Blouses",
  "Festive Collection",
];
export const AdminProducts = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onToggleVisibility,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Bridal Blouse",
    numericPrice: 14e3,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=900",
    description: "",
    fabric: "Pure Mulberry Raw Silk",
    color: "Deep Burgundy",
    sizes: "32, 34, 36, 38, 40",
    craftsmanshipDetails: "Handcrafted zardosi; 40+ hours; Muslin interior",
    inStock: 5,
    isNew: true,
  });
  const handleOpenAddModal = () => {
    setFormData({
      name: "",
      category: "Bridal Blouse",
      numericPrice: 15e3,
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=900",
      description:
        "Hand-tailored blouse featuring antique bullion embroidery and authentic temple gold work.",
      fabric: "Pure Mulberry Raw Silk",
      color: "Deep Wine Burgundy",
      sizes: "32, 34, 36, 38, 40",
      craftsmanshipDetails:
        "Hand-twisted antique metallic threads, double reinforced seams",
      inStock: 6,
      isNew: true,
    });
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };
  const handleOpenEditModal = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      category: prod.category,
      numericPrice: prod.numericPrice,
      image: prod.image,
      description: prod.description,
      fabric: prod.fabric,
      color: prod.color,
      sizes: prod.sizes.join(", "),
      craftsmanshipDetails: (prod.craftsmanshipDetails || []).join("; "),
      inStock: prod.inStock,
      isNew: !!prod.isNew,
    });
    setIsAddModalOpen(true);
  };
  const handleSaveProduct = (e) => {
    e.preventDefault();
    const sizesArray = formData.sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const detailsArray = formData.craftsmanshipDetails
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean);
    const priceFormatted = `₹${formData.numericPrice.toLocaleString("en-IN")}`;
    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name: formData.name,
        category: formData.category,
        numericPrice: Number(formData.numericPrice),
        price: priceFormatted,
        image: formData.image,
        description: formData.description,
        fabric: formData.fabric,
        color: formData.color,
        sizes: sizesArray,
        craftsmanshipDetails: detailsArray,
        inStock: Number(formData.inStock),
        isNew: formData.isNew,
      });
    } else {
      onAddProduct({
        name: formData.name,
        category: formData.category,
        numericPrice: Number(formData.numericPrice),
        price: priceFormatted,
        image: formData.image,
        gallery: [formData.image],
        description: formData.description,
        fabric: formData.fabric,
        color: formData.color,
        sizes: sizesArray,
        craftsmanshipDetails: detailsArray,
        inStock: Number(formData.inStock),
        isNew: formData.isNew,
        isVisible: true,
      });
    }
    setIsAddModalOpen(false);
    setEditingProduct(null);
  };
  const filtered = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8BFA0]/50">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B47A24] font-semibold">
            Catalog Management
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#5A171B] font-medium">
            Products & Inventory
          </h1>
          <p className="text-xs text-[#765C4D] mt-1">
            Manage your boutique creations, adjust live stock, and configure
            showcase items.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-[#5A171B] hover:bg-[#4A1719] text-[#FFF8ED] px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2 shadow-sm transition-all"
        >
          <Plus size={14} className="text-[#B47A24]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FFF8ED] p-4 border border-[#D8BFA0] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#765C4D]"
          />
          <input
            type="text"
            placeholder="Search piece by name or fabric..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F6E9D5]/50 border border-[#D8BFA0] pl-9 pr-3 py-1.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#765C4D]">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#F6E9D5]/50 border border-[#D8BFA0] px-3 py-1.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
          >
            <option value="All">All Categories ({products.length})</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#FFF8ED] border border-[#D8BFA0] overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#D8BFA0] bg-[#F6E9D5]/60 text-[#765C4D] uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4 font-medium">Piece Details</th>
              <th className="py-3 px-4 font-medium">Category</th>
              <th className="py-3 px-4 font-medium">Price</th>
              <th className="py-3 px-4 font-medium">Stock</th>
              <th className="py-3 px-4 font-medium">Badges</th>
              <th className="py-3 px-4 font-medium">Visibility</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8BFA0]/40">
            {filtered.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-[#F6E9D5]/30 transition-colors"
              >
                {/* Details */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-14 object-cover border border-[#D8BFA0]/70 shrink-0"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#5A171B]">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#765C4D] font-light">
                        {product.fabric}
                      </p>
                      <p className="text-[10px] text-[#B47A24] font-mono">
                        {product.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="py-3 px-4 text-[#4A1719] font-medium">
                  {product.category}
                </td>

                {/* Price */}
                <td className="py-3 px-4 font-serif text-sm font-medium text-[#5A171B]">
                  {product.price}
                </td>

                {/* Stock */}
                <td className="py-3 px-4">
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded-xs font-semibold ${product.inStock > 0 ? "bg-[#123C36]/10 text-[#123C36]" : "bg-red-100 text-red-700"}`}
                  >
                    {product.inStock} left
                  </span>
                </td>

                {/* Badges */}
                <td className="py-3 px-4">
                  <button
                    onClick={() =>
                      onUpdateProduct({ ...product, isNew: !product.isNew })
                    }
                    className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 border transition-all ${product.isNew ? "bg-[#5A171B] text-[#FFF8ED] border-[#5A171B]" : "text-[#765C4D] border-[#D8BFA0] hover:border-[#5A171B]"}`}
                  >
                    {product.isNew ? "New" : "Standard"}
                  </button>
                </td>

                {/* Visibility */}
                <td className="py-3 px-4">
                  <button
                    onClick={() => onToggleVisibility(product.id)}
                    className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 font-medium transition-colors ${product.isVisible ? "text-[#123C36] hover:text-red-700" : "text-[#765C4D] hover:text-[#123C36]"}`}
                    title={
                      product.isVisible
                        ? "Hide from public boutique"
                        : "Publish to boutique"
                    }
                  >
                    {product.isVisible ? (
                      <>
                        <Eye size={13} />
                        <span>Visible</span>
                      </>
                    ) : (
                      <>
                        <EyeOff size={13} />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="p-1 text-[#765C4D] hover:text-[#5A171B] transition-colors"
                      title="Edit Product"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => setProductToDelete(product)}
                      className="p-1 text-[#765C4D] hover:text-red-700 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A1719]/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative bg-[#FFF8ED] border-2 border-[#D8BFA0] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-[#765C4D] hover:text-[#5A171B] border border-[#D8BFA0] rounded-full"
            >
              <X size={16} />
            </button>

            <h3 className="font-serif text-2xl text-[#5A171B] mb-4">
              {editingProduct
                ? "Edit Boutique Piece"
                : "Add New Boutique Piece"}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5A171B] font-medium mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5A171B] font-medium mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5A171B] font-medium mb-1">
                    Price in INR (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.numericPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numericPrice: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5A171B] font-medium mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5A171B] font-medium mb-1">
                    Fabric Composition
                  </label>
                  <input
                    type="text"
                    value={formData.fabric}
                    onChange={(e) =>
                      setFormData({ ...formData, fabric: e.target.value })
                    }
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5A171B] font-medium mb-1">
                    Color Hue
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5A171B] font-medium mb-1">
                    Inventory Stock
                  </label>
                  <input
                    type="number"
                    value={formData.inStock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        inStock: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5A171B] font-medium mb-1">
                    Mark as "New"
                  </label>
                  <div className="flex items-center h-9">
                    <input
                      type="checkbox"
                      id="isNewCheck"
                      checked={formData.isNew}
                      onChange={(e) =>
                        setFormData({ ...formData, isNew: e.target.checked })
                      }
                      className="w-4 h-4 text-[#5A171B] rounded-xs"
                    />
                    <label
                      htmlFor="isNewCheck"
                      className="ml-2 text-xs text-[#4A1719]"
                    >
                      Display "New" badge on storefront
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5A171B] font-medium mb-1">
                  Available Sizes (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.sizes}
                  onChange={(e) =>
                    setFormData({ ...formData, sizes: e.target.value })
                  }
                  placeholder="32, 34, 36, 38, 40, Custom Measurement"
                  className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5A171B] font-medium mb-1">
                  Craftsmanship Highlights (semicolon separated)
                </label>
                <input
                  type="text"
                  value={formData.craftsmanshipDetails}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      craftsmanshipDetails: e.target.value,
                    })
                  }
                  placeholder="48+ hours zardosi work; Double reinforced seams; Hand-cast brass hooks"
                  className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5A171B] font-medium mb-1">
                  Description & Story
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2 text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#765C4D] hover:text-[#5A171B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#5A171B] text-[#FFF8ED] px-6 py-2 text-xs uppercase tracking-wider font-medium"
                >
                  {editingProduct ? "Update Piece" : "Create Piece"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A1719]/60 backdrop-blur-xs">
          <div className="bg-[#FFF8ED] border-2 border-red-300 max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <AlertTriangle size={36} className="text-red-700 mx-auto" />
            <h3 className="font-serif text-xl text-[#5A171B]">
              Remove Product?
            </h3>
            <p className="text-xs text-[#765C4D]">
              Are you sure you want to remove{" "}
              <strong className="text-[#5A171B]">{productToDelete.name}</strong>{" "}
              from the boutique catalog?
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 text-xs text-[#765C4D] hover:text-[#5A171B]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteProduct(productToDelete.id);
                  setProductToDelete(null);
                }}
                className="bg-red-800 text-white px-5 py-2 text-xs uppercase tracking-wider font-semibold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
