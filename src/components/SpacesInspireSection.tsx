import { motion } from "framer-motion";
import spacesImg from "@/assets/spaces-inspire.jpg";

const SpacesInspireSection = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <img
        src={spacesImg}
        alt="Spaces that inspire"
        loading="lazy"
        width={1920}
        height={1080}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Left Text */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="absolute top-1/2 left-8 md:left-16 -translate-y-1/2"
      >
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight">
          SPACES THAT
          <br />
          INSPIRE,
          <br />
          <span className="text-accent">DESIGNED</span>
          <br />
          FOR LIFE
        </h2>
      </motion.div>

      {/* Bottom Values */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="absolute bottom-8 right-8 md:right-16 flex gap-6 md:gap-10"
      >
        {[
          { title: "Realty", sub: "that Delivers Excellence" },
          { title: "Reliability", sub: "that Nurtures Trust" },
          { title: "Responsibility", sub: "that Shapes Tomorrow" },
        ].map((v) => (
          <div key={v.title} className="text-right">
            <p className="text-accent font-serif text-lg md:text-xl font-bold">{v.title}</p>
            <p className="text-white/80 font-sans text-xs md:text-sm">{v.sub}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default SpacesInspireSection;
