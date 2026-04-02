import nlvLogoWhite from "@/assets/nlv-logo.png";
import nlvLogoDark from "@/assets/nlv-logo-dark.png";

const NLVLogo = ({ className = "", scrolled = false }: { className?: string; scrolled?: boolean }) => (
  <div className={`flex items-center ${className}`}>
    <img
      src={scrolled ? nlvLogoDark : nlvLogoWhite}
      alt="NLV - Next Level Vision"
      className="h-12 w-auto transition-all duration-500"
    />
  </div>
);

export default NLVLogo;
