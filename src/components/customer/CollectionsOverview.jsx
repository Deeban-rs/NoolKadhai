import { ArrowRight } from "lucide-react";
import { COLLECTIONS_LIST } from "../../data/mockData";
import { DecorativeHeader } from "../common/DecorativeHeader";
export const CollectionsOverview = ({ onSelectCategory }) => {
  return (
    <section className="py-20 md:py-28 bg-[#F6E9D5] border-b border-[#D8BFA0]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DecorativeHeader
          tagline="Curated Portfolios"
          title="Explore Our Collections"
          subtitle="Distinct silhouettes reflecting ancient tradition and contemporary panache."
          ornamentVariant="needle"
        />

        {/* Editorial Grid: Asymmetrical Luxury Layout - Responsive 2-column grid on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {COLLECTIONS_LIST.map((col, index) => {
            return (
              <div
                key={col.slug}
                onClick={() => onSelectCategory(col.slug)}
                className="group cursor-pointer flex flex-col bg-white border border-[#D8BFA0]/60 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-[#B47A24] rounded-xs"
              >
                {/* Image frame */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#EBD8BD]/40">
                  <img
                    src={col.image}
                    alt={col.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter saturate-[0.95] group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  {/* Antique framing lines inside card */}
                  <div className="absolute inset-2 sm:inset-3 border border-[#FFF8ED]/30 pointer-events-none group-hover:border-[#B47A24]/60 transition-colors duration-500" />

                  <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4">
                    <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium bg-[#FFF8ED]/90 px-2 sm:px-3 py-0.5 sm:py-1 text-[#5A171B] border border-[#D8BFA0]/50 shadow-2xs">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-5 md:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-sm sm:text-xl md:text-2xl text-[#5A171B] group-hover:text-[#B47A24] transition-colors leading-snug line-clamp-1">
                      {col.title}
                    </h3>
                    <p className="text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-[#B47A24] font-medium mt-0.5 sm:mt-1 mb-1.5 sm:mb-3 truncate">
                      {col.tagline}
                    </p>
                    <p className="text-[10px] sm:text-xs text-[#765C4D] leading-tight sm:leading-relaxed line-clamp-2 font-light hidden sm:block">
                      {col.description}
                    </p>
                  </div>

                  <div className="mt-2 sm:mt-6 pt-2 sm:pt-4 border-t border-[#D8BFA0]/30 flex items-center justify-between text-[8px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#5A171B] font-medium group-hover:text-[#B47A24] transition-colors">
                    <span className="truncate">Explore</span>
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1.5 transition-transform shrink-0"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
