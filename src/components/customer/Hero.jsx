import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Scissors,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { NoolKadhaiLogo } from "../common/NoolKadhaiLogo";
const SLIDES = [
  {
    id: 1,
    tagline: "Fashion Studio • Handcrafted Fashion",
    title: "Dress Your",
    titleAccent: "Story",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1400",
    captionTitle: "Antique Zardosi on Mulberry Raw Silk",
    captionDetail: "Hand-stitched bridal blouse in our Tamil Nadu atelier",
    accentBadge: "Bridal Couture",
  },
  {
    id: 2,
    tagline: "Heritage Silks • Temple Artistry",
    title: "Timeless",
    titleAccent: "Heritage",
    description:
      "Immerse in authentic Kanchipuram and Banarasi silks, celebrating centuries-old temple motifs and rich zari borders designed to be treasured.",
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=85&w=1400",
    captionTitle: "Pure Silk Brocade with Temple Weave",
    captionDetail: "Crafted on traditional looms by master artisans",
    accentBadge: "Heirloom Silks",
  },
  {
    id: 3,
    tagline: "Modern Graces • Festive Elegance",
    title: "Curated",
    titleAccent: "Grace",
    description:
      "Contemporary silhouettes tailored with clean, architectural cuts. From fluid organza ensembles to understated festive tunics, crafted for modern celebrations.",
    image:
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=85&w=1400",
    captionTitle: "Emerald Chanderi with Hand-Done Gota",
    captionDetail: "Lightweight festive coordinates for discerning soirees",
    accentBadge: "Festive Wear",
  },
  {
    id: 4,
    tagline: "Made-To-Measure • Atelier Service",
    title: "Custom",
    titleAccent: "Design",
    description:
      "Bring your own design vision, heirloom saree, or custom neckline specifications. Our master patternmakers craft every garment to your millimeter measurements.",
    image:
      "https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&q=85&w=1400",
    captionTitle: "Personalized Custom Fit & Patternmaking",
    captionDetail: "One-on-one atelier design consultation & styling",
    accentBadge: "Custom Studio",
  },
];
export const Hero = ({ onExploreCollection, onCreateYourLook }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);
  const slideIntervalRef = useRef(null);
  const progressIntervalRef = useRef(null);
  useEffect(() => {
    if (isPaused) {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
      return;
    }
    setTimerProgress(0);
    const startTime = Date.now();
    const duration = 5e3;
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setTimerProgress(progress);
    }, 50);
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      setTimerProgress(0);
    }, duration);
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
    };
  }, [currentSlide, isPaused]);
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setTimerProgress(0);
  };
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setTimerProgress(0);
  };
  const current = SLIDES[currentSlide];
  return (
    <section
      className="relative bg-[#F6E9D5] border-b border-[#D8BFA0]/50 py-5 sm:py-8 md:py-14 lg:py-18 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8">
        {/* Main Grid: Left Typography & Content with Craft Background, Right Visual Carousel - Responsive 2-column grid on mobile, tablet, and desktop */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Editorial Information backed by Craft Background */}
          <div className="col-span-1 relative rounded-xs border border-[#D8BFA0] shadow-md md:shadow-xl overflow-hidden flex flex-col justify-between p-3 sm:p-5 md:p-8 lg:p-10 z-10 min-h-[360px] sm:min-h-[440px] md:min-h-[520px] lg:min-h-[580px] bg-[#F6ECE0]">
            {/* The Authentic Craft Background Canvas */}
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-95 transition-opacity duration-700"
              style={{ backgroundImage: "url('/assets/hero-left-bg.svg')" }}
            />
            {/* Subtle soft gradient over canvas to guarantee maximum typographic contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9]/50 via-transparent to-[#E8D6BF]/30 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-start text-left w-full">
              {/* Brand Pillars & Tagline Badge */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 md:px-3.5 md:py-1.5 border border-[#D8BFA0] bg-[#FFF8ED]/95 backdrop-blur-xs rounded-full shadow-2xs max-w-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B47A24] animate-pulse shrink-0" />
                  <span className="text-[6px] min-[400px]:text-[7px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.08em] min-[400px]:tracking-[0.1em] sm:tracking-[0.25em] font-medium text-[#765C4D] leading-tight text-left break-words">
                    {current.tagline}
                  </span>
                </div>
                <div className="inline-flex items-center justify-center gap-1 sm:gap-1.5 text-[6px] min-[400px]:text-[7px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.05em] sm:tracking-[0.12em] md:tracking-[0.2em] font-semibold text-[#1A3E35] bg-[#FFF8ED]/90 px-1.5 sm:px-2 md:px-2.5 py-1 rounded-full border border-[#D8BFA0]/60 shadow-2xs whitespace-nowrap">
                  <span>Bridal</span>
                  <span className="text-[#B47A24]">•</span>
                  <span>Western</span>
                  <span className="text-[#B47A24]">•</span>
                  <span>Custom</span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="min-h-[42px] sm:min-h-[64px] md:min-h-[100px] flex flex-col justify-center my-0.5 sm:my-1">
                <h1 className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-serif text-[#5A171B] leading-[1.12] sm:leading-[1.1] tracking-tight font-normal transition-opacity duration-500">
                  {current.title}{" "}
                  <span className="italic font-light text-[#4A1719] block sm:inline">
                    {current.titleAccent}
                  </span>
                </h1>
              </div>

              {/* Decorative Gold Thread Line */}
              <div className="w-full max-w-xs my-1.5 sm:my-2.5 md:my-3.5 flex items-center gap-1.5 sm:gap-2.5">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#B47A24] to-[#D8BFA0]" />
                <span className="text-[7px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.3em] font-serif italic text-[#B47A24] whitespace-nowrap">
                  Haute Atelier
                </span>
                <div className="h-[1px] w-4 sm:w-6 bg-[#D8BFA0]" />
              </div>

              {/* Dynamic Editorial Description
              <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#523A2B] leading-tight sm:leading-relaxed max-w-lg mb-2.5 sm:mb-4 md:mb-6 font-normal line-clamp-2 sm:line-clamp-3 md:line-clamp-none transition-opacity duration-500 bg-[#FFF8ED]/85 backdrop-blur-[2px] p-1.5 sm:p-2.5 md:p-3 rounded-xs border border-[#D8BFA0]/50 shadow-2xs">
                {current.description}
              </p> */}

              {/* Action CTAs */}
              <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 w-full sm:w-auto">
                <button
                  onClick={onExploreCollection}
                  className="bg-[#5A171B] text-[#FFF8ED] hover:bg-[#4A1719] px-2.5 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 uppercase text-[8px] sm:text-[10px] md:text-xs tracking-[0.12em] sm:tracking-[0.2em] font-medium transition-all duration-300 hover:shadow-lg border border-[#5A171B] flex items-center justify-center gap-1.5 sm:gap-2.5 group shadow-md"
                >
                  <span className="truncate">Explore Collection</span>
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform text-[#D8BFA0] shrink-0"
                  />
                </button>

                <button
                  onClick={onCreateYourLook}
                  className="bg-[#FFF8ED] text-[#5A171B] border border-[#D8BFA0] hover:border-[#5A171B] hover:bg-[#5A171B] hover:text-[#FFF8ED] px-2.5 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 uppercase text-[8px] sm:text-[10px] md:text-xs tracking-[0.12em] sm:tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2.5 shadow-xs"
                >
                  <Scissors size={12} className="text-[#B47A24] shrink-0" />
                  <span className="truncate">Custom Design</span>
                </button>
              </div>
            </div>

            {/* Carousel Navigation Toolbar with Timer Progress */}
            <div className="relative z-10 w-full pt-2 sm:pt-3 border-t border-[#D8BFA0]/60 flex items-center justify-between mt-auto bg-[#FFF8ED]/80 backdrop-blur-xs px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xs">
              {/* Slide Numbers */}
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <span className="font-serif text-sm sm:text-lg md:text-2xl text-[#5A171B] font-medium">
                  0{currentSlide + 1}
                </span>
                <span className="text-[10px] sm:text-xs text-[#765C4D]">
                  / 0{SLIDES.length}
                </span>

                {/* Progress bar for 5-second interval */}
                <div className="w-8 sm:w-16 md:w-24 h-1 bg-[#D8BFA0]/50 rounded-full overflow-hidden ml-1 sm:ml-2">
                  <div
                    className="h-full bg-[#B47A24] transition-all duration-75 ease-linear"
                    style={{ width: `${timerProgress}%` }}
                  />
                </div>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  onClick={handlePrevSlide}
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-full border border-[#D8BFA0] bg-[#FFF8ED] text-[#5A171B] hover:bg-[#5A171B] hover:text-[#FFF8ED] flex items-center justify-center transition-all shadow-xs"
                  aria-label="Previous slide"
                  title="Previous image"
                >
                  <ChevronLeft size={13} />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-full border border-[#D8BFA0] bg-[#FFF8ED] text-[#5A171B] hover:bg-[#5A171B] hover:text-[#FFF8ED] flex items-center justify-center transition-all shadow-xs"
                  aria-label="Next slide"
                  title="Next image (changes every 5s)"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Editorial Image Carousel */}
          <div className="col-span-1 relative flex flex-col justify-between">
            <div className="relative w-full h-full flex flex-col">
              {/* Decorative Framing Accent */}
              <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-full h-full border border-[#B47A24]/40 pointer-events-none hidden md:block" />

              {/* Main Image Stage */}
              <div className="relative bg-[#FFF8ED] p-2 sm:p-3 md:p-4 border border-[#D8BFA0] shadow-md md:shadow-xl overflow-hidden flex-1 flex flex-col">
                <div className="aspect-[3/4] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] w-full h-full min-h-[300px] sm:min-h-[380px] md:min-h-[440px] overflow-hidden relative bg-[#EBD8BD]/40">
                  {/* Image Slides with Fade Transition */}
                  {SLIDES.map((slide, index) => {
                    const isActive = index === currentSlide;
                    return (
                      <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"}`}
                      >
                        <img
                          src={slide.image}
                          alt={slide.captionTitle}
                          className="w-full h-full object-cover object-center"
                        />
                        {/* Soft Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#4A1719]/70 via-transparent to-black/10 pointer-events-none" />
                      </div>
                    );
                  })}

                  {/* Top Badge: Featured Category */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 z-20">
                    <span className="bg-[#5A171B] text-[#FFF8ED] text-[7px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.22em] font-medium px-2 py-0.5 sm:px-3 sm:py-1 shadow-md border border-[#D8BFA0]/30">
                      {current.accentBadge}
                    </span>
                  </div>

                  {/* Bottom Caption Card */}
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 md:bottom-4 md:left-4 md:right-4 z-20 bg-[#FFF8ED]/95 backdrop-blur-md p-2 sm:p-3 md:p-4 border border-[#D8BFA0]/70 shadow-md">
                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                      <p className="text-[7px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#B47A24] font-semibold">
                        Atelier Focus
                      </p>
                      <span className="text-[7px] sm:text-[8px] md:text-[9px] text-[#765C4D] uppercase tracking-wider hidden sm:inline">
                        Handcrafted
                      </span>
                    </div>
                    <h3 className="font-serif text-xs sm:text-base md:text-lg lg:text-xl text-[#5A171B] leading-tight line-clamp-1">
                      {current.captionTitle}
                    </h3>
                    <p className="text-[9px] sm:text-[11px] md:text-xs text-[#765C4D] italic mt-0.5 font-light line-clamp-1">
                      {current.captionDetail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Slide Indicator Dots Below */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                {SLIDES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      setTimerProgress(0);
                    }}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-5 sm:w-8 bg-[#5A171B]" : "w-1.5 sm:w-2 bg-[#D8BFA0] hover:bg-[#B47A24]"}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Floating Quality Seal with Nool Kadhai Mark */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-[#4A1719] text-[#FFF8ED] p-2 rounded-full border-2 border-[#B47A24] shadow-2xl hidden md:flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-center z-30">
                <NoolKadhaiLogo variant="mark" light={true} className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-0.5" />
                <span className="text-[6px] sm:text-[7px] lg:text-[8px] uppercase tracking-widest font-semibold text-[#F6E9D5]">
                  Haute Atelier
                </span>
                <span className="text-[5px] sm:text-[6px] lg:text-[7px] text-[#B47A24] tracking-wider">
                  Dress Your Story
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
