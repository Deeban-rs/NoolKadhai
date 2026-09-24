import { Check, Info, X } from "lucide-react";
export const Toast = ({ message, type = "success", onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#FFF8ED] border border-[#D8BFA0] text-[#5A171B] px-5 py-3.5 shadow-lg rounded-sm animate-fade-in max-w-md">
      <div
        className={`p-1 rounded-full ${type === "success" ? "bg-[#123C36] text-[#FFF8ED]" : "bg-[#B47A24] text-[#FFF8ED]"}`}
      >
        {type === "success" ? <Check size={14} /> : <Info size={14} />}
      </div>
      <p className="text-xs tracking-wide font-medium flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-[#765C4D] hover:text-[#5A171B] transition-colors p-1"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
};
