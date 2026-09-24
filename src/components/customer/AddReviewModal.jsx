import { useState } from "react";
import { X, Star, MessageSquare, CheckCircle2 } from "lucide-react";
import { Ornament } from "../common/Ornament";
export const AddReviewModal = ({ isOpen, onClose, onSubmitReview }) => {
  if (!isOpen) return null;
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(5);
  const [occasion, setOccasion] = useState("");
  const [review, setReview] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !review) return;
    onSubmitReview({
      customerName,
      rating,
      review,
      occasion: occasion || "Boutique Purchase",
    });
    setIsSuccess(true);
  };
  const handleDone = () => {
    setIsSuccess(false);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#4A1719]/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative bg-[#FFF8ED] border-2 border-[#D8BFA0] max-w-lg w-full p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleDone}
          className="absolute top-4 right-4 p-2 text-[#765C4D] hover:text-[#5A171B] border border-[#D8BFA0]/60 rounded-full hover:bg-[#F6E9D5] transition-all"
        >
          <X size={16} />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#123C36] text-[#FFF8ED] rounded-full mx-auto flex items-center justify-center border border-[#B47A24]">
              <CheckCircle2 size={30} />
            </div>
            <h3 className="font-serif text-2xl text-[#5A171B]">
              Testimonial Submitted
            </h3>
            <p className="text-xs text-[#765C4D] leading-relaxed max-w-sm mx-auto">
              Thank you for sharing your experience! To uphold our atelier
              standards, all reviews are verified by our boutique management
              before being published on the homepage.
            </p>
            <Ornament variant="diamond" className="my-4" />
            <button
              onClick={handleDone}
              className="bg-[#5A171B] text-[#FFF8ED] px-6 py-2.5 text-xs uppercase tracking-[0.2em]"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B47A24]">
                Atelier Guestbook
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#5A171B]">
                Share Your Experience
              </h3>
              <p className="text-xs text-[#765C4D] font-serif italic mt-1">
                Tell future brides and patrons about your fit and craftsmanship.
              </p>
              <Ornament variant="needle" className="my-3" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Natarajan"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                  Star Rating
                </label>
                <div className="flex items-center gap-2 text-[#B47A24]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        size={22}
                        className={
                          star <= rating ? "fill-[#B47A24]" : "text-[#D8BFA0]"
                        }
                      />
                    </button>
                  ))}
                  <span className="text-xs font-serif text-[#765C4D] ml-2">
                    {rating} out of 5 stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                  Occasion (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wedding Reception, Engagement, Temple Festival"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                  Your Review / Testimonial *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the fabric feel, tailoring accuracy, zardosi work, or packing experience..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] p-2.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#5A171B] hover:bg-[#4A1719] text-[#FFF8ED] py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageSquare size={14} className="text-[#B47A24]" />
                  <span>Submit for Atelier Review</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-[#765C4D] italic mt-1">
                *Reviews are screened for authenticity in the Owner Portal prior
                to public publication.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
