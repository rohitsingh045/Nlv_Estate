import nlvLogoWhite from "@/assets/nlv-logo.png";
import nlvLogoDark from "@/assets/nlv-logo-dark.png";

const NLVLogo = ({ className = "", scrolled = false }: { className?: string; scrolled?: boolean }) => (
  <div className={`flex items-start overflow-hidden h-8 ${className}`}>
    <img
      src={scrolled ? nlvLogoDark : nlvLogoWhite}
      alt="NLV Logo"
      className="h-12 w-auto object-top transition-all duration-500"
    />
  </div>
);

export default NLVLogo;
