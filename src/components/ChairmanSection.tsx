import { motion } from "framer-motion";
import chairmanImg from "@/assets/chairman.jpg";

const ChairmanSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Left - Chairman Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <img
            src={chairmanImg}
            alt="Chairman - NLV"
            loading="lazy"
            width={720}
            height={900}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right - Green Background with Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-accent p-10 md:p-16 flex flex-col justify-center"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
            <span className="text-accent-foreground/80">FROM THE</span>
            <br />
            <span className="text-accent-foreground font-extrabold">CHAIRMAN'S DESK</span>
          </h2>
          <p className="text-accent-foreground/90 font-sans text-base leading-relaxed mb-8">
            NLV blends innovation, quality, and sustainability to create iconic spaces that
            redefines luxury. With strong vision, tech-driven execution, and attention to detail,
            we aim to set new benchmarks in India's real estate landscape.
          </p>
          <div className="border-t border-accent-foreground/20 pt-6">
            <p className="text-accent-foreground font-serif font-bold text-lg">Mr Lokesh Kumar</p>
            <p className="text-accent-foreground/70 font-sans text-sm">
              Founder & Chairman, NLV Realty Pvt. Ltd.
            </p>
            <a href="tel:+916200488170" className="text-accent-foreground/70 font-sans text-sm mt-1 inline-block hover:text-accent-foreground transition-colors">
              +91 62004 88170
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChairmanSection;
