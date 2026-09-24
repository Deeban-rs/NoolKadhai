import { Star, MessageSquarePlus, Quote } from "lucide-react";
import { DecorativeHeader } from "../common/DecorativeHeader";
export const CustomerReviews = ({ reviews, onOpenAddReview }) => {
  const approvedReviews = reviews.filter((r) => r.status === "approved");
  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#D8BFA0]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DecorativeHeader
          tagline="Client Testimonials"
          title="Our Happy Customers"
          subtitle="Words of affection from the women who bring our threads to life."
          ornamentVariant="floral"
        />

        {approvedReviews.length === 0 ? (
          <div className="text-center py-12 text-[#765C4D] font-serif italic">
            <p>Our client journals are being woven. Check back shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {approvedReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#FAF6F0] border border-[#D8BFA0]/60 p-7 sm:p-8 flex flex-col justify-between relative hover:border-[#B47A24] transition-all duration-300 shadow-xs rounded-xs"
              >
                {/* Small Quote Mark */}
                <Quote
                  size={28}
                  className="text-[#B47A24]/20 absolute top-6 right-6"
                />

                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-[#B47A24] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={
                          i < rev.rating ? "fill-[#B47A24]" : "text-[#D8BFA0]"
                        }
                      />
                    ))}
                  </div>

                  {/* Review Quote */}
                  <p className="font-serif text-base sm:text-lg text-[#4A1719] italic leading-relaxed mb-6 font-normal">
                    "{rev.review}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#D8BFA0]/40 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-base text-[#5A171B] font-medium tracking-wide">
                      — {rev.customerName}
                    </h4>
                    {rev.occasion && (
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#B47A24] font-medium mt-0.5">
                        {rev.occasion}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] text-[#765C4D] font-mono">
                    {rev.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Callout to add testimonial */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenAddReview}
            className="inline-flex items-center gap-2.5 bg-transparent border border-[#5A171B] text-[#5A171B] hover:bg-[#5A171B] hover:text-[#FFF8ED] px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all"
          >
            <MessageSquarePlus size={14} className="text-[#B47A24]" />
            <span>Share Your Nool Kadhai Experience</span>
          </button>
          <p className="text-[11px] text-[#765C4D] italic mt-2">
            *Submitted reviews are verified by our boutique team before public
            display.
          </p>
        </div>
      </div>
    </section>
  );
};
