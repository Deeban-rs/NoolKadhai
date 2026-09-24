import { Ornament } from "./Ornament";
export const DecorativeHeader = ({
  title,
  subtitle,
  tagline,
  ornamentVariant = "needle",
  align = "center",
  className = "",
}) => {
  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {tagline && (
        <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#B47A24] mb-3">
          {tagline}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#5A171B] tracking-tight font-normal leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[#765C4D] font-serif italic text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <Ornament
        variant={ornamentVariant}
        className={align === "left" ? "justify-start" : "justify-center"}
      />
    </div>
  );
};
