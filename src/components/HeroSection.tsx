import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import heroImg from "@/assets/hero-building.jpg";
import heroVideoAsset from "@/assets/hero-video-long.mp4.asset.json";

const stats = [
  { value: "upcoming+", label: "Projects Delivered" },
  { value: "+", label: "Happy Clients" },
  { value: "8+", label: "Years Experience" },
];

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={heroImg}
          className="w-full h-full object-cover"
        >
          <source src={heroVideoAsset.url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/30" />
      </div>

      {/* Pause / Play Button - Centered */}
      <button
        onClick={toggleVideo}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1 transition-all hover:scale-110"
      >
        <span className="text-primary-foreground font-sans text-sm font-semibold tracking-wide">
          {isPlaying ? "Pause" : "Play"}
        </span>
        <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center shadow-lg">
          {isPlaying ? (
            <Pause size={28} className="text-primary-foreground" />
          ) : (
            <Play size={28} className="text-primary-foreground ml-0.5" />
          )}
        </div>
      </button>

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gold font-sans text-sm font-semibold tracking-[0.3em] uppercase mb-4"
          >
            Premium Real Estate
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Find Your Dream{" "}
            <span className="text-gold italic">Home</span>{" "}
            with NLV
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-primary-foreground/80 font-sans text-lg md:text-xl mb-10 max-w-lg leading-relaxed"
          >
            Discover an exquisite collection of premium properties crafted for those who demand nothing but the finest in luxury living.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href="#contact"
              className="bg-accent text-accent-foreground px-8 py-4 rounded-lg font-sans font-semibold text-base shadow-gold transition-all hover:scale-105 hover:shadow-lg"
            >
              Book a Visit
            </a>
            <a
              href="#properties"
              className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg font-sans font-semibold text-base transition-all hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
            >
              Explore Properties
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="glass-panel rounded-2xl p-6 md:p-8 inline-flex flex-wrap gap-8 md:gap-12"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-gold font-serif text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-primary-foreground/70 font-sans text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
