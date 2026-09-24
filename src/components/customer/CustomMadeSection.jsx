import { Scissors, Ruler, PenTool, Sparkles, ArrowRight } from "lucide-react";
import { Ornament } from "../common/Ornament";
export const CustomMadeSection = ({ onOpenCustomModal }) => {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#D8BFA0]/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column: Craftsmanship Imagery with Ornamental Offset Border */}
          <div className="col-span-1 relative">
            <div className="relative mx-auto max-w-lg md:max-w-none">
              {/* Antique Offset Frame */}
              <div className="absolute -bottom-5 -right-5 w-full h-full border-2 border-[#B47A24]/40 pointer-events-none hidden sm:block" />

              <div className="relative bg-[#EBD8BD] p-3 border border-[#D8BFA0] shadow-xl">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&q=80&w=1000"
                    alt="Master tailor cutting pattern and measuring bespoke bridal dress"
                    className="w-full h-full object-cover object-center filter saturate-[0.9] hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Floating Atelier Badge */}
              <div className="absolute -top-6 -left-6 bg-[#5A171B] text-[#F6E9D5] p-4 sm:p-5 shadow-xl border border-[#D8BFA0] max-w-[180px] sm:max-w-[200px] hidden sm:block">
                <Scissors size={20} className="text-[#B47A24] mb-2" />
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#D8BFA0]">
                  Bespoke Fitting
                </p>
                <p className="font-serif text-xs sm:text-sm leading-snug mt-1">
                  Drafted individually to your millimeter proportions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy and Pillars */}
          <div className="col-span-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D8BFA0] bg-[#F6E9D5] rounded-full mb-4">
              <Sparkles size={11} className="text-[#B47A24]" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#765C4D]">
                Made-to-Order Couture
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#5A171B] leading-tight font-normal">
              Made For You
            </h2>

            <p className="font-serif text-xl sm:text-2xl italic text-[#B47A24] mt-2 mb-4">
              "Your vision. Your measurements. Your story."
            </p>

            <Ornament variant="needle" className="!justify-start my-4" />

            <p className="text-sm sm:text-base text-[#765C4D] leading-relaxed mb-8 font-light">
              Do you have a specific neckline in mind, an heirloom family silk
              saree to re-purpose into a bridal blouse, or a bespoke vision for
              an upcoming gala? Our master artisans handcraft each piece
              according to your exact measurements, color palette, and
              embroidery preferences.
            </p>

            {/* Feature List */}
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#EBD8BD]/60 border border-[#D8BFA0] flex items-center justify-center text-[#5A171B] shrink-0 mt-0.5">
                  <Scissors size={15} />
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-[0.15em] font-semibold text-[#5A171B]">
                    Personalized Design Consultations
                  </h4>
                  <p className="text-xs text-[#765C4D] font-light mt-0.5">
                    Direct communication with our atelier team to choose
                    fabrics, necklines, and motifs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#EBD8BD]/60 border border-[#D8BFA0] flex items-center justify-center text-[#5A171B] shrink-0 mt-0.5">
                  <PenTool size={15} />
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-[0.15em] font-semibold text-[#5A171B]">
                    Exclusive Hand Embroidery
                  </h4>
                  <p className="text-xs text-[#765C4D] font-light mt-0.5">
                    Authentic Zardosi, Aari, Maggam work, pearls, and beaten
                    antique gold threads.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#EBD8BD]/60 border border-[#D8BFA0] flex items-center justify-center text-[#5A171B] shrink-0 mt-0.5">
                  <Ruler size={15} />
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-[0.15em] font-semibold text-[#5A171B]">
                    Precision Fitting for Every Body Type
                  </h4>
                  <p className="text-xs text-[#765C4D] font-light mt-0.5">
                    Generous inner seam allowances and reinforced stitching for
                    utmost comfort and flattering drape.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onOpenCustomModal}
              className="bg-[#123C36] text-[#FFF8ED] hover:bg-[#0e2c28] px-9 py-4 uppercase text-xs tracking-[0.25em] font-medium transition-all duration-300 shadow-md border border-[#123C36] hover:border-[#B47A24] flex items-center gap-3 group"
            >
              <span>Customize Your Dress</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform text-[#B47A24]"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
