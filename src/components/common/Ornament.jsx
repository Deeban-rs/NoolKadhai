export const Ornament = ({ variant = "diamond", className = "" }) => {
  if (variant === "needle") {
    return (
      <div
        className={`flex items-center justify-center gap-3 my-6 opacity-75 ${className}`}
        aria-hidden="true"
      >
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#B47A24]" />
        {/* Needle and Thread SVG */}
        <svg
          className="w-5 h-5 text-[#B47A24]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 20L19 5" strokeLinecap="round" />
          <circle cx="19" cy="5" r="1.5" fill="#B47A24" />
          <path
            d="M7 17C10 18 12 15 15 17C17 19 19 18 21 16"
            strokeDasharray="1.5 2"
            strokeLinecap="round"
          />
        </svg>
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#B47A24]" />
      </div>
    );
  }
  if (variant === "floral") {
    return (
      <div
        className={`flex items-center justify-center gap-3 my-6 opacity-80 ${className}`}
        aria-hidden="true"
      >
        <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-r from-transparent to-[#B47A24]" />
        <svg
          className="w-4 h-4 text-[#B47A24]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C12 7 7 12 2 12C7 12 12 17 12 22C12 17 17 12 22 12C17 12 12 7 12 2Z" />
        </svg>
        <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-l from-transparent to-[#B47A24]" />
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center gap-3 my-6 opacity-70 ${className}`}
      aria-hidden="true"
    >
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#B47A24]" />
      <div className="w-1.5 h-1.5 rotate-45 border border-[#B47A24] bg-[#B47A24]/20" />
      <div className="w-1 h-1 rounded-full bg-[#5A171B]" />
      <div className="w-1.5 h-1.5 rotate-45 border border-[#B47A24] bg-[#B47A24]/20" />
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#B47A24]" />
    </div>
  );
};
