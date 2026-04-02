import { motion } from "framer-motion";
import towerImg from "@/assets/luxury-tower-night.jpg";
import archImg from "@/assets/contemporary-arch.jpg";

const LuxuryElevatesSection = () => {
  return (
    <section className="bg-foreground overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Left - Tower Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <img
            src={towerImg}
            alt="NLV Luxury Tower"
            loading="lazy"
            width={720}
            height={900}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right - Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-10 md:p-16 flex flex-col justify-center bg-background"
        >
          <div className="border-l-2 border-foreground pl-6 mb-8">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-tight">
              LUXURY THAT
              <br />
              <span className="text-accent">ELEVATES</span>
              <br />
              <span className="text-accent">EVERYDAY</span>
              <br />
              <span className="text-accent">LIVING</span>
            </h2>
          </div>
          <p className="text-muted-foreground font-sans text-base leading-relaxed mb-8">
            Redefining your living with thoughtfully crafted luxury homes by NLV.
          </p>

          {/* Contemporary Architecture Preview */}
          <div>
            <p className="font-serif text-sm font-bold text-foreground mb-3">Contemporary Architecture</p>
            <div className="rounded-xl overflow-hidden shadow-card">
              <img
                src={archImg}
                alt="Contemporary Architecture"
                loading="lazy"
                width={640}
                height={512}
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LuxuryElevatesSection;
