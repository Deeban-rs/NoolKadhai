import { useState } from "react";
import { MessageSquare, Star, Check, Trash2, ShieldCheck } from "lucide-react";
export const AdminReviews = ({
  reviews,
  onApproveReview,
  onRejectReview,
  onDeleteReview,
}) => {
  const [filter, setFilter] = useState("pending");
  const filteredReviews = reviews.filter(
    (r) => filter === "all" || r.status === filter,
  );
  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const approvedCount = reviews.filter((r) => r.status === "approved").length;
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8BFA0]/50">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B47A24] font-semibold">
            Social Proof & Testimonials
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#5A171B] font-medium">
            Review Moderation Queue
          </h1>
          <p className="text-xs text-[#765C4D] mt-1">
            Carefully curate genuine client experiences before they go live on
            your boutique homepage.
          </p>
        </div>
      </div>

      {/* Info Callout Banner */}
      <div className="bg-[#FFF8ED] border-l-4 border-[#B47A24] p-4 text-xs text-[#4A1719] flex items-start gap-3 shadow-xs">
        <ShieldCheck size={18} className="text-[#B47A24] shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-[#5A171B]">
            Public Visibility Policy:
          </p>
          <p className="text-[#765C4D] mt-0.5 leading-relaxed">
            Customer submissions are held in this queue with{" "}
            <span className="font-semibold text-[#B47A24]">"Pending"</span>{" "}
            status. Only testimonials marked{" "}
            <span className="font-semibold text-[#123C36]">"Approved"</span>{" "}
            appear on the customer storefront.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D8BFA0]/40 pb-3">
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all flex items-center gap-1.5 ${filter === "pending" ? "bg-[#B47A24] text-[#FFF8ED] border-[#B47A24]" : "border-[#D8BFA0] text-[#765C4D] hover:text-[#5A171B]"}`}
        >
          <span>Pending Verification</span>
          <span className="bg-[#FFF8ED] text-[#B47A24] px-1.5 py-0.2 rounded-full text-[10px] font-bold">
            {pendingCount}
          </span>
        </button>

        <button
          onClick={() => setFilter("approved")}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all flex items-center gap-1.5 ${filter === "approved" ? "bg-[#123C36] text-[#FFF8ED] border-[#123C36]" : "border-[#D8BFA0] text-[#765C4D] hover:text-[#5A171B]"}`}
        >
          <span>Published Live</span>
          <span className="bg-[#FFF8ED] text-[#123C36] px-1.5 py-0.2 rounded-full text-[10px] font-bold">
            {approvedCount}
          </span>
        </button>

        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all ${filter === "all" ? "bg-[#5A171B] text-[#FFF8ED] border-[#5A171B]" : "border-[#D8BFA0] text-[#765C4D]"}`}
        >
          All Reviews ({reviews.length})
        </button>
      </div>

      {/* Reviews Cards List */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-16 bg-[#FFF8ED] border border-[#D8BFA0]/50 p-8">
          <MessageSquare size={36} className="mx-auto text-[#D8BFA0] mb-2" />
          <h4 className="font-serif text-xl text-[#5A171B]">
            No reviews in this view
          </h4>
          <p className="text-xs text-[#765C4D] mt-1">
            {filter === "pending"
              ? "All customer testimonials have been processed."
              : "No reviews found."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className={`bg-[#FFF8ED] border p-5 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${rev.status === "approved" ? "border-[#123C36]/40 hover:border-[#123C36]" : rev.status === "pending" ? "border-[#B47A24] hover:border-[#5A171B]" : "border-red-200"}`}
            >
              {/* Content */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-serif text-base font-medium text-[#5A171B]">
                    {rev.customerName}
                  </h4>
                  <div className="flex items-center text-[#B47A24]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={
                          i < rev.rating ? "fill-[#B47A24]" : "text-[#D8BFA0]"
                        }
                      />
                    ))}
                  </div>
                  {rev.occasion && (
                    <span className="text-[10px] uppercase tracking-wider text-[#B47A24] font-medium px-2 py-0.5 bg-[#F6E9D5]/60 border border-[#D8BFA0]">
                      {rev.occasion}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#4A1719] italic leading-relaxed font-light">
                  "{rev.review}"
                </p>

                <div className="flex items-center gap-4 text-[10px] text-[#765C4D]">
                  <span>Submitted on: {rev.date}</span>
                  <span
                    className={`font-semibold uppercase tracking-wider px-2 py-0.2 rounded-xs ${rev.status === "approved" ? "bg-[#123C36]/10 text-[#123C36]" : rev.status === "pending" ? "bg-[#B47A24]/10 text-[#B47A24]" : "bg-red-50 text-red-700"}`}
                  >
                    ●{" "}
                    {rev.status === "approved"
                      ? "Visible on Storefront"
                      : rev.status}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D8BFA0]/30">
                {rev.status !== "approved" && (
                  <button
                    onClick={() => onApproveReview(rev.id)}
                    className="bg-[#123C36] hover:bg-[#0e2c28] text-[#FFF8ED] px-4 py-2 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Check size={13} />
                    <span>Approve & Publish</span>
                  </button>
                )}

                {rev.status === "approved" && (
                  <button
                    onClick={() => onRejectReview(rev.id)}
                    className="bg-[#F6E9D5] hover:bg-[#EBD8BD] text-[#765C4D] px-3 py-2 text-xs uppercase tracking-wider font-medium border border-[#D8BFA0] transition-colors"
                  >
                    Unpublish
                  </button>
                )}

                {rev.status === "pending" && (
                  <button
                    onClick={() => onRejectReview(rev.id)}
                    className="border border-[#D8BFA0] text-[#765C4D] hover:text-red-700 hover:border-red-300 px-3 py-2 text-xs uppercase tracking-wider font-medium transition-colors"
                  >
                    Reject
                  </button>
                )}

                <button
                  onClick={() => onDeleteReview(rev.id)}
                  className="p-2 text-[#765C4D] hover:text-red-700 transition-colors"
                  title="Delete review permanently"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
