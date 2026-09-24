import { useState } from "react";
import {
  X,
  Heart,
  ShoppingBag,
  Scissors,
  Sparkles,
  Check,
  ShieldCheck,
} from "lucide-react";
import { Ornament } from "../common/Ornament";
export const ProductDetailModal = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenCustomWithProduct,
}) => {
  if (!product) return null;
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "34");
  const [addedNotice, setAddedNotice] = useState(false);
  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2e3);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#4A1719]/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative bg-[#FFF8ED] border-2 border-[#D8BFA0] max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 w-10 h-10 rounded-full bg-[#FFF8ED] border border-[#D8BFA0] flex items-center justify-center text-[#5A171B] hover:bg-[#5A171B] hover:text-[#FFF8ED] transition-colors"
          aria-label="Close details"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Gallery */}
          <div className="md:col-span-6 space-y-4">
            <div className="aspect-[3/4] bg-[#EBD8BD]/30 border border-[#D8BFA0] overflow-hidden relative">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md border border-[#D8BFA0]/50 transition-all ${isWishlisted ? "bg-[#FFF8ED] text-[#5A171B]" : "bg-[#FFF8ED]/80 text-[#765C4D] hover:text-[#5A171B]"}`}
                aria-label="Toggle wishlist"
              >
                <Heart
                  size={18}
                  className={isWishlisted ? "fill-[#5A171B]" : ""}
                />
              </button>
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-20 border-2 overflow-hidden shrink-0 transition-all ${activeImage === img ? "border-[#B47A24]" : "border-[#D8BFA0]/50 opacity-70 hover:opacity-100"}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#B47A24] font-medium mb-1">
                {product.category}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#5A171B] leading-snug">
                {product.name}
              </h2>
              <p className="font-serif text-2xl text-[#5A171B] font-medium mt-2">
                {product.price}
              </p>

              <Ornament variant="needle" className="!justify-start my-4" />

              <p className="text-xs sm:text-sm text-[#765C4D] leading-relaxed font-light mb-6">
                {product.description}
              </p>

              {/* Fabric and Color */}
              <div className="space-y-2 py-3 border-y border-[#D8BFA0]/50 text-xs text-[#4A1719] mb-6">
                <div className="flex justify-between">
                  <span className="text-[#765C4D]">Fabric:</span>
                  <span className="font-medium">{product.fabric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#765C4D]">Color Hue:</span>
                  <span className="font-medium">{product.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#765C4D]">Availability:</span>
                  <span className="font-medium text-[#123C36]">
                    {product.inStock > 0
                      ? `In Atelier (${product.inStock} crafted)`
                      : "Made to order only"}
                  </span>
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-[0.15em] font-medium text-[#5A171B]">
                    Select Size:
                  </label>
                  <button
                    onClick={() => onOpenCustomWithProduct(product)}
                    className="text-[11px] text-[#B47A24] hover:underline flex items-center gap-1 font-serif italic"
                  >
                    <Scissors size={12} />
                    Need custom body measurements?
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 text-xs font-medium border transition-all ${selectedSize === size ? "bg-[#5A171B] text-[#FFF8ED] border-[#5A171B]" : "bg-[#F6E9D5]/50 text-[#4A1719] border-[#D8BFA0] hover:border-[#B47A24]"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Craftsmanship Bullet Points */}
              {product.craftsmanshipDetails &&
                product.craftsmanshipDetails.length > 0 && (
                  <div className="bg-[#F6E9D5]/40 border border-[#D8BFA0]/50 p-4 mb-6">
                    <div className="flex items-center gap-1.5 text-[#B47A24] text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">
                      <Sparkles size={12} />
                      <span>Artisan Finishing Highlights</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#765C4D] font-light">
                      {product.craftsmanshipDetails.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#B47A24] font-bold">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#D8BFA0]/50">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAdd}
                  disabled={product.inStock === 0}
                  className={`flex-1 py-3.5 px-6 uppercase text-xs tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all ${addedNotice ? "bg-[#123C36] text-[#FFF8ED]" : "bg-[#5A171B] text-[#FFF8ED] hover:bg-[#4A1719]"}`}
                >
                  {addedNotice ? (
                    <>
                      <Check size={15} />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={15} />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onOpenCustomWithProduct(product)}
                  className="py-3.5 px-5 bg-transparent border border-[#B47A24] text-[#B47A24] hover:bg-[#B47A24] hover:text-[#FFF8ED] uppercase text-xs tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Scissors size={14} />
                  <span>Request Custom Fit</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-[#765C4D] italic flex items-center justify-center gap-1">
                <ShieldCheck size={13} className="text-[#123C36]" />
                Includes complimentary alteration support from our Salem master
                tailors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
