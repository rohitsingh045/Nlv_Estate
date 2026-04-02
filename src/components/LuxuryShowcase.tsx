import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import luxury1 from "@/assets/luxury-1.jpg";
import luxury2 from "@/assets/luxury-2.jpg";
import luxury3 from "@/assets/luxury-3.jpg";

const EnquireNowSidebar = () => {
  const [useLightTheme, setUseLightTheme] = useState(false);

  useEffect(() => {
    const getEffectiveBackground = (element: Element | null) => {
      let current = element as HTMLElement | null;

      while (current && current !== document.body) {
        const styles = window.getComputedStyle(current);
        const backgroundColor = styles.backgroundColor;

        if (backgroundColor && backgroundColor !== "rgba(0, 0, 0, 0)" && backgroundColor !== "transparent") {
          return backgroundColor;
        }

        current = current.parentElement;
      }

      return window.getComputedStyle(document.body).backgroundColor;
    };

    const isGreenBackground = (color: string) => {
      const match = color.match(/\d+/g);
      if (!match || match.length < 3) return false;

      const [r, g, b] = match.slice(0, 3).map(Number);
      return g >= 110 && g > r * 1.15 && g > b * 1.1;
    };

    const updateSidebarTheme = () => {
      const button = document.querySelector("[data-enquire-btn]") as HTMLElement | null;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const probeX = Math.max(0, rect.left - 8);
      const probeY = Math.min(window.innerHeight - 1, Math.max(0, rect.top + rect.height / 2));
      const elementBehind = document.elementFromPoint(probeX, probeY);
      const backgroundColor = getEffectiveBackground(elementBehind);

      setUseLightTheme(isGreenBackground(backgroundColor));
    };

    window.addEventListener("scroll", updateSidebarTheme, { passive: true });
    window.addEventListener("resize", updateSidebarTheme);
    updateSidebarTheme();

    return () => {
      window.removeEventListener("scroll", updateSidebarTheme);
      window.removeEventListener("resize", updateSidebarTheme);
    };
  }, []);

  return (
    <a
      href="#contact"
      data-enquire-btn
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 font-sans font-bold text-xs tracking-[0.2em] uppercase px-2 py-6 rounded-l-lg shadow-lg hover:px-3 transition-all duration-300 ${
        useLightTheme ? "bg-primary-foreground text-accent" : "bg-accent text-accent-foreground"
      }`}
      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
    >
      ENQUIRE NOW
    </a>
  );
};

const projects = [
  {
    image: luxury1,
    name: "NLV Skyline Tower",
    // location: "Sector 84, Gurugram",
    config: "3 BHK · 3.5 BHK · 4.5 BHK",
  },
  {
    image: luxury2,
    name: "NLV Twin Residences",
    // location: "Sector 63, Gurugram",
    config: "2.5 BHK · 3 BHK · 4 BHK",
  },
  {
    image: luxury3,
    name: "NLV Grand Villas",
    // location: "Whitefield, Bangalore",
    config: "4 BHK · 5 BHK · Penthouse",
  },
];

const LuxuryShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-primary" data-enquire-theme="light">
      {/* Decorative circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-white/15 absolute" />
        <div className="w-[800px] h-[800px] rounded-full border border-white/10 absolute" />
      </div>

      {/* Sticky Enquire Now sidebar */}
      <EnquireNowSidebar />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-bold uppercase">
            <span className="text-white">LUXURY BEYOND THE</span>
            <br />
            <span className="text-white font-normal">ORDINARY</span>
          </h2>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-700 ${
                activeIndex === i
                  ? "ring-2 ring-accent shadow-[0_0_40px_rgba(76,175,80,0.3)]"
                  : "ring-1 ring-accent/20"
              }`}
              onClick={() => setActiveIndex(i)}
            >
              <div className="relative h-[350px] md:h-[420px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${project.name}-${activeIndex === i ? "active" : "idle"}`}
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    width={800}
                    height={1024}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: activeIndex === i ? 1.05 : 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                </AnimatePresence>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Active indicator */}
                {activeIndex === i && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 border-2 border-accent rounded-2xl"
                    transition={{ duration: 0.4 }}
                  />
                )}
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
                <p className="font-serif text-lg font-bold">{project.name}</p>
                <p className="text-sm text-accent font-sans">{project.location}</p>
                <p className="text-xs text-primary-foreground/70 font-sans mt-1">{project.config}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeIndex === i
                  ? "w-8 bg-accent"
                  : "w-2 bg-primary-foreground/30 hover:bg-primary-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Enquire Now button */}
        <div className="text-center mt-10">
          <a
            href="#contact"
            className="inline-block bg-accent text-accent-foreground font-sans font-bold px-10 py-4 rounded-full text-sm tracking-wider uppercase hover:scale-105 transition-transform"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default LuxuryShowcase;
