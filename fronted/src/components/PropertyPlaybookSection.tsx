import { motion } from "framer-motion";
import familyHome from "@/assets/family-home.jpg";
import investGrow from "@/assets/invest-grow.jpg";
import commercialSpace from "@/assets/commercial-space.jpg";
import growingFamily from "@/assets/growing-family.jpg";

const items = [
  { image: familyHome, title: "DREAM HOME FOR LOVED ONES", position: "top-left" },
  { image: investGrow, title: "GROW WITH US", position: "top-right" },
  { image: commercialSpace, title: "UNLOCKING OPPORTUNITIES: COMMERCIAL SPACES", position: "bottom-left" },
  { image: growingFamily, title: "EXPANDING HORIZONS: FOR GROWING FAMILIES", position: "bottom-right" },
];

const PropertyPlaybookSection = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            <span className="text-accent">PROPERTY</span>
            <br />
            <span className="text-accent">PURCHASE</span>
            <br />
            <span className="text-foreground">PLAYBOOK</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative"
            >
              <p className="font-sans text-xs font-bold tracking-wider uppercase text-foreground mb-3">
                {item.title}
              </p>
              <div className="rounded-xl overflow-hidden shadow-card border border-border">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={800}
                  height={640}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyPlaybookSection;
