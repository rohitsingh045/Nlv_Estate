import { Shield, Award, Users, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  { icon: Shield, title: "Trust & Integrity", desc: "Transparent dealings and honest guidance at every step." },
  { icon: Award, title: "Premium Quality", desc: "Meticulously crafted spaces that exceed expectations." },
  { icon: Users, title: "Client First", desc: "Your dream home vision drives every decision we make." },
  { icon: Building2, title: "Innovation", desc: "Cutting-edge design with sustainable building practices." },
];

const AboutSection = () => (
  <section id="about" className="py-24 px-6 bg-secondary">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            About Us
          </p>
          {/* <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
            Building Dreams{" "}
            <span className="text-gold italic">Since 2008</span>
          </h2> */}
          <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-6">
            NLV is a premier real estate company dedicated to creating extraordinary living experiences. With over 18 years of expertise, we've transformed skylines and built communities that stand the test of time.
          </p>
          <p className="text-muted-foreground font-sans leading-relaxed mb-8">
            Our commitment to quality, transparency, and innovation has earned the trust of over 5,000 families who call our properties home. Every project reflects our passion for excellence and our vision for modern luxury living.
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-sans font-semibold transition-all hover:scale-105 shadow-luxury">
            Download Brochure
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 gap-5"
        >
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-popover rounded-2xl p-6 shadow-card hover:shadow-luxury transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                <v.icon size={22} className="text-accent" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
