import { Ornament } from "../common/Ornament";
import { NoolKadhaiLogo } from "../common/NoolKadhaiLogo";
export const AboutSection = () => {
  return (
    <section className="py-20 md:py-32 bg-[#F6E9D5] border-b border-[#D8BFA0]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#B47A24] mb-3">
            The Atelier & Brand Insignia
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#5A171B] font-normal tracking-tight">
            Our Story
          </h2>
          <p className="text-xl sm:text-2xl font-serif italic text-[#4A1719] mt-3">
            "Dress Your Story"
          </p>
          <Ornament variant="needle" className="my-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Text */}
          <div className="lg:col-span-6 space-y-6 text-[#765C4D] leading-relaxed font-light text-base sm:text-lg">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-[#5A171B] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
              Born in Salem, Tamil Nadu,{" "}
              <strong className="font-serif text-[#5A171B] font-medium">
                Nool Kadhai (நூல் கதை)
              </strong>{" "}
              translates to "The Thread of Stories". Our atelier was established
              upon a singular conviction: that clothing is deeply personal, and
              true elegance lies in the patient, generational mastery of
              needlecraft and handloom art.
            </p>

            <p>
              In our studio, master patternmakers, hand-embroidery karigars, and
              tailors weave stories across silk, chanderi, and organza. From
              intricate bridal blouses adorned with antique gold zardosi to
              contemporary western silhouettes cut with precision, each piece is
              conceived to celebrate the woman who wears it.
            </p>

            <div className="pt-6 border-t border-[#D8BFA0]/40 grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-serif text-lg text-[#5A171B] font-medium">
                  Salem Atelier
                </h4>
                <p className="text-xs text-[#765C4D] mt-1">
                  Handcrafted by master artisans in Tamil Nadu, India.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-lg text-[#5A171B] font-medium">
                  Global Courier
                </h4>
                <p className="text-xs text-[#765C4D] mt-1">
                  Worldwide tailored packaging and doorstep delivery.
                </p>
              </div>
            </div>

            {/* Three Core Pillars Banner */}
            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase font-medium text-[#1A3E35]">
              <span className="px-3 py-1.5 bg-[#FFF8ED] border border-[#D8BFA0] rounded-xs shadow-2xs">
                Bridal Blouse
              </span>
              <span className="px-3 py-1.5 bg-[#FFF8ED] border border-[#D8BFA0] rounded-xs shadow-2xs">
                Western Wear
              </span>
              <span className="px-3 py-1.5 bg-[#FFF8ED] border border-[#D8BFA0] rounded-xs shadow-2xs">
                Custom Made
              </span>
            </div>
          </div>

          {/* Authentic Boutique Logo Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md">
              <NoolKadhaiLogo variant="card" className="shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
