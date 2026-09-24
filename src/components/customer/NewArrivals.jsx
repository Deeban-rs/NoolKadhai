import { Heart, Eye, ArrowRight } from "lucide-react";
import { DecorativeHeader } from "../common/DecorativeHeader";

// Helper to determine the pure item type as requested:
// "just mention the type of the items in the cards if its saree metion it only as saree if it is bloues mention it as blouse and metion its price"
const getItemType = (product) => {
  if (!product) return "Couture";
  const text = `${product.name} ${product.category} ${product.description || ""}`.toLowerCase();

  if (text.includes("saree") || text.includes("sari")) {
    return "Saree";
  }
  if (text.includes("blouse")) {
    return "Blouse";
  }
  if (text.includes("lehenga")) {
    return "Lehenga";
  }
  if (text.includes("gown") || text.includes("dress") || text.includes("anarkali")) {
    return "Dress";
  }
  if (text.includes("kurti") || text.includes("kurta")) {
    return "Kurti";
  }
  if (text.includes("suit") || text.includes("ensemble")) {
    return "Ensemble";
  }
  return product.category?.replace(/Collection|Wear|Pure/gi, "").trim() || "Couture";
};

export const NewArrivals = ({
  products,
  wishlist,
  onToggleWishlist,
  onSelectProduct,
  onViewAll,
}) => {
  const displayProducts = products.filter((p) => p.isVisible).slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-[#FFFDF9] border-b border-[#D8BFA0]/40 relative overflow-hidden">
      {/* Subtle decorative background watermark */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(#B47A24_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(#5A171B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <DecorativeHeader
          tagline="Handcrafted Atelier"
          title="New Arrivals"
          subtitle="Sculpted silhouettes, heirloom textures, and pure hand-embroidery."
          ornamentVariant="diamond"
        />

        {/* Bespoke Designed Grid - 2 columns on mobile, 4 columns on tablet & desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-8 mt-8 sm:mt-10 md:mt-12">
          {displayProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const itemType = getItemType(product);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative flex flex-col bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#F5EBE0] border border-[#D8BFA0] rounded-t-[48px] sm:rounded-t-[68px] md:rounded-t-[84px] rounded-b-xs shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer overflow-hidden"
              >
                {/* Dashed Gold Couture Embroidery Stitch Border */}
                <div className="absolute inset-1.5 sm:inset-2 md:inset-2.5 border border-dashed border-[#B47A24]/35 pointer-events-none rounded-t-[42px] sm:rounded-t-[60px] md:rounded-t-[76px] rounded-b-2xs transition-colors duration-500 group-hover:border-[#B47A24]/75 z-20" />

                {/* Top Center Quality Emblem Accent */}
                <div className="absolute top-2 sm:top-3 inset-x-0 flex justify-center z-30 pointer-events-none">
                  <span className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-serif font-medium text-[#765C4D] bg-[#FFF8ED]/95 px-2 sm:px-3 py-0.5 rounded-full border border-[#D8BFA0]/70 shadow-2xs truncate max-w-[90%]">
                    Atelier Edition
                  </span>
                </div>

                {/* Inner Padding Container */}
                <div className="p-2 sm:p-3 md:p-3.5 pb-3.5 sm:pb-4 md:pb-5 flex flex-col flex-1 relative z-10">
                  {/* Arched Window Image Frame */}
                  <div className="relative overflow-hidden rounded-t-[38px] sm:rounded-t-[54px] md:rounded-t-[72px] rounded-b-xs aspect-[3/4] bg-[#EBD8BD]/30 border border-[#D8BFA0]/40 shadow-inner mt-4 sm:mt-5">
                    <img
                      src={product.image}
                      alt={itemType}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 filter saturate-[0.98] group-hover:saturate-105"
                    />

                    {/* Warm Vignette and Lighting Sheen on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A1719]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Stock / New Tag if applicable */}
                    {product.isNew && (
                      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-20 pointer-events-none">
                        <span className="bg-[#5A171B]/90 backdrop-blur-xs text-[#FFF8ED] text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] px-1.5 sm:px-2.5 py-0.5 sm:py-1 font-medium border border-[#D8BFA0]/40 shadow-xs">
                          New
                        </span>
                      </div>
                    )}

                    {/* Floating Luxury Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-30 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center border ${
                        isWishlisted
                          ? "bg-[#5A171B] text-[#FFF8ED] border-[#5A171B] shadow-md"
                          : "bg-[#FFF8ED]/90 text-[#765C4D] border-[#D8BFA0]/80 hover:text-[#5A171B] hover:border-[#5A171B] shadow-xs"
                      }`}
                      aria-label={
                        isWishlisted ? "Remove from wishlist" : "Save to wishlist"
                      }
                    >
                      <Heart
                        size={13}
                        className={`transition-transform duration-200 ${
                          isWishlisted ? "fill-[#FFF8ED] scale-110" : "hover:scale-110"
                        }`}
                      />
                    </button>

                    {/* Quick View Button Sliding Up on Hover */}
                    <div className="absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="w-full bg-[#FFF8ED]/95 text-[#5A171B] hover:bg-[#5A171B] hover:text-[#FFF8ED] py-1.5 sm:py-2 text-[8px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.22em] font-medium border border-[#D8BFA0] transition-colors flex items-center justify-center gap-1 sm:gap-1.5 shadow-md"
                      >
                        <Eye size={11} />
                        <span>View Piece</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Info: STRICT REQUIREMENT - Only the Type of Item and Price */}
                  <div className="pt-3 sm:pt-4 md:pt-5 pb-1 px-1 text-center flex flex-col items-center justify-center flex-grow">
                    {/* Filament Motif Accent */}
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 opacity-70 group-hover:opacity-100 transition-opacity">
                      <span className="h-[1px] w-3 sm:w-5 md:w-6 bg-gradient-to-r from-transparent to-[#B47A24]" />
                      <span className="text-[#B47A24] text-[8px] sm:text-[10px]">❖</span>
                      <span className="h-[1px] w-3 sm:w-5 md:w-6 bg-gradient-to-l from-transparent to-[#B47A24]" />
                    </div>

                    {/* The Pure Item Type (Saree, Blouse, etc.) */}
                    <h3 className="font-serif text-sm sm:text-lg md:text-xl lg:text-2xl text-[#4A1719] tracking-[0.08em] sm:tracking-[0.14em] uppercase font-normal group-hover:text-[#B47A24] transition-colors leading-tight">
                      {itemType}
                    </h3>

                    {/* Gold Divider Line */}
                    <div className="w-6 sm:w-8 h-[1px] bg-[#D8BFA0]/60 my-1.5 sm:my-2 transition-all duration-300 group-hover:w-12 group-hover:bg-[#B47A24]" />

                    {/* Price */}
                    <p className="text-xs sm:text-sm md:text-base font-serif font-semibold text-[#5A171B] tracking-wide">
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Catalog Link */}
        <div className="mt-14 text-center">
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 border-b border-[#5A171B] pb-1 text-xs uppercase tracking-[0.25em] text-[#5A171B] font-medium hover:text-[#B47A24] hover:border-[#B47A24] transition-colors group"
          >
            <span>Explore Complete Collection</span>
            <ArrowRight
              size={13}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
