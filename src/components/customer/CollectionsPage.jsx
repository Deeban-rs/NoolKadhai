import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Heart, Eye } from "lucide-react";
import { DecorativeHeader } from "../common/DecorativeHeader";
const CATEGORIES = [
  "All",
  "Bridal Blouse",
  "Western Wear",
  "Custom Made",
  "Ethnic Wear",
  "Designer Blouses",
  "Festive Collection",
];
export const CollectionsPage = ({
  products,
  selectedCategory,
  onCategoryChange,
  wishlist,
  onToggleWishlist,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (!product.isVisible) return false;
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.numericPrice - b.numericPrice;
        if (sortBy === "price-high") return b.numericPrice - a.numericPrice;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);
  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <DecorativeHeader
        tagline="Boutique Catalog"
        title="Our Complete Collections"
        subtitle="Every silhouette is crafted with pure handloom fabrics and intricate hand embroidery."
        ornamentVariant="needle"
      />

      {/* Category Tabs */}
      <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 mb-8 gap-2 sm:gap-3 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-200 border ${isActive ? "bg-[#5A171B] text-[#FFF8ED] border-[#5A171B] shadow-xs" : "bg-[#FFF8ED] text-[#765C4D] border-[#D8BFA0]/60 hover:border-[#B47A24] hover:text-[#5A171B]"}`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Search and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFF8ED] p-4 border border-[#D8BFA0]/50 mb-10">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#765C4D]"
          />
          <input
            type="text"
            placeholder="Search by silk, zardosi, color..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F6E9D5]/50 border border-[#D8BFA0]/60 pl-10 pr-4 py-2 text-xs text-[#4A1719] placeholder:text-[#765C4D]/60 focus:outline-none focus:border-[#5A171B]"
          />
        </div>

        {/* Total counts & Sort */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <span className="text-xs text-[#765C4D] font-serif italic">
            Showing {filteredProducts.length} pieces
          </span>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={13} className="text-[#B47A24]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F6E9D5]/50 border border-[#D8BFA0]/60 px-3 py-2 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
            >
              <option value="featured">Featured Pieces</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#FFF8ED] border border-[#D8BFA0]/40 p-8">
          <p className="font-serif text-2xl text-[#5A171B]">
            No pieces match your selection
          </p>
          <p className="text-xs text-[#765C4D] mt-2 mb-6">
            Try adjusting your search criteria or explore our custom-made
            service.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              onCategoryChange("All");
            }}
            className="bg-[#5A171B] text-[#FFF8ED] px-6 py-2.5 text-xs uppercase tracking-[0.2em]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#FFF8ED] border border-[#D8BFA0]/40 transition-all duration-300 hover:shadow-lg hover:border-[#B47A24]/60"
              >
                {/* Product Image */}
                <div
                  className="relative overflow-hidden aspect-[3/4] bg-[#EBD8BD]/30 cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="bg-[#5A171B] text-[#FFF8ED] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 font-medium shadow-xs">
                        New
                      </span>
                    )}
                    {product.inStock <= 3 && product.inStock > 0 && (
                      <span className="bg-[#B47A24] text-[#FFF8ED] text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 font-medium shadow-xs">
                        Only {product.inStock} left
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${isWishlisted ? "bg-[#FFF8ED] text-[#5A171B]" : "bg-[#FFF8ED]/80 text-[#765C4D] hover:text-[#5A171B] hover:bg-[#FFF8ED]"}`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart
                      size={15}
                      className={isWishlisted ? "fill-[#5A171B]" : ""}
                    />
                  </button>

                  {/* Quick view button */}
                  <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="w-full bg-[#FFF8ED]/95 text-[#5A171B] hover:bg-[#5A171B] hover:text-[#FFF8ED] py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium border border-[#D8BFA0] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Eye size={12} />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex flex-col flex-grow text-center">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#B47A24] font-medium mb-1">
                    {product.category}
                  </p>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-base sm:text-lg text-[#4A1719] line-clamp-1 hover:text-[#B47A24] transition-colors cursor-pointer font-normal"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#765C4D] line-clamp-1 mt-1 font-light italic">
                    {product.fabric}
                  </p>
                  <p className="mt-2 text-sm sm:text-base font-serif font-medium text-[#5A171B] tracking-wide">
                    {product.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
