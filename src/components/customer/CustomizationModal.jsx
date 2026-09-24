import { useState } from "react";
import { X, Scissors, Send, CheckCircle2 } from "lucide-react";
import { Ornament } from "../common/Ornament";
export const CustomizationModal = ({
  isOpen,
  onClose,
  prefilledProduct,
  onSubmitRequest,
}) => {
  if (!isOpen) return null;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dressType, setDressType] = useState(
    prefilledProduct ? prefilledProduct.category : "Bridal Blouse",
  );
  const [occasion, setOccasion] = useState("Temple Wedding / Muhurtham");
  const [preferredColor, setPreferredColor] = useState(
    prefilledProduct ? prefilledProduct.color : "",
  );
  const [fabricPreference, setFabricPreference] = useState(
    prefilledProduct ? prefilledProduct.fabric : "Pure Mulberry Raw Silk",
  );
  const [sizeMeasurements, setSizeMeasurements] = useState("");
  const [budget, setBudget] = useState("₹15,000 - ₹25,000");
  const [referenceImage, setReferenceImage] = useState(
    prefilledProduct ? prefilledProduct.image : "",
  );
  const [customerMessage, setCustomerMessage] = useState(
    prefilledProduct
      ? `I am interested in tailoring "${prefilledProduct.name}" to my personal measurements and slight neckline variations.`
      : "",
  );
  const [submittedId, setSubmittedId] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;
    const newId = onSubmitRequest({
      name,
      email,
      phone,
      dressType,
      occasion,
      preferredColor: preferredColor || "Custom Palette",
      fabricPreference: fabricPreference || "Atelier Recommendation",
      sizeMeasurements:
        sizeMeasurements || "Will provide over phone/consultation",
      budget,
      referenceImage,
      customerMessage:
        customerMessage || "Looking for personalized tailoring consultation.",
    });
    setSubmittedId(newId);
  };
  const handleResetAndClose = () => {
    setSubmittedId(null);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#4A1719]/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative bg-[#FFF8ED] border-2 border-[#D8BFA0] max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-10 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-[#765C4D] hover:text-[#5A171B] border border-[#D8BFA0]/60 rounded-full hover:bg-[#F6E9D5] transition-all"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {submittedId ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 bg-[#123C36] text-[#FFF8ED] rounded-full mx-auto flex items-center justify-center border-2 border-[#B47A24] shadow-md">
              <CheckCircle2 size={32} />
            </div>

            <h3 className="font-serif text-3xl text-[#5A171B]">
              Your Request Has Been Received
            </h3>

            <p className="text-xs uppercase tracking-[0.25em] text-[#B47A24] font-semibold">
              Request ID: {submittedId}
            </p>

            <Ornament variant="needle" className="my-4" />

            <p className="text-sm text-[#765C4D] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#5A171B]">{name}</strong>. Our
              head atelier designer in Salem has received your requirements and
              will reach out via WhatsApp or phone (
              <strong className="text-[#5A171B]">{phone}</strong>) within 24
              hours to discuss sketches, swatches, and measurements.
            </p>

            <div className="pt-6">
              <button
                onClick={handleResetAndClose}
                className="bg-[#5A171B] text-[#FFF8ED] px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#4A1719] transition-colors"
              >
                Return to Boutique
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#B47A24] font-semibold mb-1">
                <Scissors size={12} />
                <span>Made-to-Order Bespoke Consultation</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#5A171B] font-normal">
                Customize Your Dress
              </h3>
              <p className="text-xs sm:text-sm text-[#765C4D] font-serif italic mt-1">
                "Your vision. Your measurements. Your story."
              </p>
              <Ornament variant="diamond" className="my-3" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sundaram"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] px-3.5 py-2.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98400 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] px-3.5 py-2.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                  />
                </div>
              </div>

              {/* Row 2: Email and Dress Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="radhika@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] px-3.5 py-2.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                    Garment Category
                  </label>
                  <select
                    value={dressType}
                    onChange={(e) => setDressType(e.target.value)}
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] px-3.5 py-2.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                  >
                    <option value="Bridal Blouse">
                      Bridal Blouse (Maggam / Zardosi)
                    </option>
                    <option value="Designer Blouses">
                      Designer Blouse (Temple Border / Aari)
                    </option>
                    <option value="Western Wear">
                      Western Silhouette / Evening Gown
                    </option>
                    <option value="Ethnic Wear">
                      Ethnic Wear / Anarkali / Kurti
                    </option>
                    <option value="Festive Collection">
                      Festive Lehenga & Choli Ensemble
                    </option>
                    <option value="Custom Made">
                      Complete Bespoke Concept
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 3: Occasion & Preferred Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                    Occasion / Event Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Muhurtham Wedding, May 2026"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] px-3.5 py-2.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                    Preferred Color Palette
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Deep Burgundy, Antique Ochre Gold, Emerald"
                    value={preferredColor}
                    onChange={(e) => setPreferredColor(e.target.value)}
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] px-3.5 py-2.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                  />
                </div>
              </div>

              {/* Row 4: Fabric & Estimated Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                    Fabric Preference
                  </label>
                  <select
                    value={fabricPreference}
                    onChange={(e) => setFabricPreference(e.target.value)}
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] px-3.5 py-2.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                  >
                    <option value="Pure Mulberry Raw Silk">
                      Pure Mulberry Raw Silk
                    </option>
                    <option value="Handloom Kanchi Brocade">
                      Handloom Kanchi Brocade
                    </option>
                    <option value="Pure Chanderi Silk">
                      Pure Chanderi Silk
                    </option>
                    <option value="Micro Velvet">Plush Micro Velvet</option>
                    <option value="Habotai & Fluid Tulle">
                      Habotai Silk & Tulle
                    </option>
                    <option value="Client Providing Fabric">
                      I will provide my own fabric/saree
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                    Estimated Budget Range
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] px-3.5 py-2.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                  >
                    <option value="₹10,000 - ₹15,000">₹10,000 - ₹15,000</option>
                    <option value="₹15,000 - ₹25,000">
                      ₹15,000 - ₹25,000 (Popular)
                    </option>
                    <option value="₹25,000 - ₹40,000">
                      ₹25,000 - ₹40,000 (Intricate Couture)
                    </option>
                    <option value="Above ₹40,000">
                      Above ₹40,000 (Masterpiece Bridal)
                    </option>
                  </select>
                </div>
              </div>

              {/* Measurements / Sizing details */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                  Approximate Measurements or Size (Inches)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bust: 36, Waist: 30, Sleeve: 11 (Or 'Standard Size 36')"
                  value={sizeMeasurements}
                  onChange={(e) => setSizeMeasurements(e.target.value)}
                  className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] px-3.5 py-2.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                />
              </div>

              {/* Customer message / Embroidery details */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5A171B] mb-1">
                  Vision, Neckline & Embroidery Wishes
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your desired neckline, back cut, sleeve length, specific motifs (e.g. peacock, lotus, monograms), or details..."
                  value={customerMessage}
                  onChange={(e) => setCustomerMessage(e.target.value)}
                  className="w-full bg-[#F6E9D5]/40 border border-[#D8BFA0] px-3.5 py-2.5 text-xs text-[#4A1719] focus:outline-none focus:border-[#5A171B]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#5A171B] hover:bg-[#4A1719] text-[#FFF8ED] py-3.5 px-6 uppercase text-xs tracking-[0.25em] font-medium transition-colors flex items-center justify-center gap-2 shadow-md border border-[#B47A24]/40"
                >
                  <Send size={14} className="text-[#B47A24]" />
                  <span>Submit Custom Bespoke Request</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-[#765C4D] italic mt-2">
                *No payment required now. Our master tailor will review your
                notes and contact you with sketches and final quotation.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
