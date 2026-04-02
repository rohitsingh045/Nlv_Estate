import { motion } from "framer-motion";
import director1 from "@/assets/director-1.jpg";
import director2 from "@/assets/director-2.jpg";
import director3 from "@/assets/director-3.jpg";

const directors = [
  { image: director1, name: "\u00A0", title: "Independent Director" },
  { image: director2, name: "\u00A0", title: "Non-Executive Director" },
  { image: director3, name: "\u00A0", title: "Executive Director" },
];

const BoardSection = () => {
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
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-accent">
            BOARD OF DIRECTORS
          </h2>
          <p className="text-muted-foreground font-sans text-base mt-4 max-w-2xl mx-auto">
            Guiding our organization with strategic insights and years of expertise, our Board of
            Directors ensures we achieve excellence while building a sustainable future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {directors.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl shadow-card">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  width={640}
                  height={800}
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-serif text-lg font-bold text-foreground">{d.name}</h3>
                <p className="text-muted-foreground font-sans text-sm">{d.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardSection;
