import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { DecorativeHeader } from "../common/DecorativeHeader";
export const WishlistPage = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onExploreCollections,
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));
  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <DecorativeHeader
        tagline="Personal Keepsakes"
        title="Your Saved Pieces"
        subtitle="Cherished silhouettes awaiting your special occasion."
        ornamentVariant="floral"
      />

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#FFF8ED] border border-[#D8BFA0]/40 p-8 max-w-lg mx-auto">
          <Heart size={36} className="mx-auto text-[#D8BFA0] mb-3" />
          <h3 className="font-serif text-2xl text-[#5A171B]">
            Your wishlist is empty
          </h3>
          <p className="text-xs text-[#765C4D] mt-2 mb-6">
            Click the heart icon on any piece to curate your personalized
            selection for weddings, receptions, and festivals.
          </p>
          <button
            onClick={onExploreCollections}
            className="bg-[#5A171B] text-[#FFF8ED] px-7 py-3 text-xs uppercase tracking-[0.2em]"
          >
            Discover Collections
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-[#FFF8ED] border border-[#D8BFA0]/50 hover:border-[#B47A24] transition-all shadow-xs"
            >
              <div
                className="relative aspect-[3/4] overflow-hidden bg-[#EBD8BD]/30 cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-[#FFF8ED] text-[#5A171B] rounded-full shadow-sm hover:bg-[#5A171B] hover:text-[#FFF8ED] transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#B47A24] font-medium">
                    {product.category}
                  </p>
                  <h4
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-lg text-[#5A171B] hover:text-[#B47A24] cursor-pointer mt-0.5 line-clamp-1"
                  >
                    {product.name}
                  </h4>
                  <p className="font-serif text-base text-[#5A171B] font-medium mt-1">
                    {product.price}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D8BFA0]/40 flex gap-2">
                  <button
                    onClick={() =>
                      onAddToCart(product, product.sizes[0] || "Standard")
                    }
                    className="flex-1 bg-[#5A171B] hover:bg-[#4A1719] text-[#FFF8ED] py-2.5 px-3 text-[11px] uppercase tracking-[0.15em] font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag size={12} />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
