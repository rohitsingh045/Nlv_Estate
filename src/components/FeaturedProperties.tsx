import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const properties = [
  {
    image: property1,
    title: "Skyline Residences",
    // location: "Sector 63, Gurugram",
    // price: "₹1.2 Cr",
    beds: 3,
    baths: 2,
    area: "1,850 sq.ft",
    tag: "New Launch",
  },
  {
    image: property2,
    title: "Palm Vista Villa",
    // location: "Whitefield, Bangalore",
    // price: "₹3.5 Cr",
    beds: 4,
    baths: 3,
    area: "3,200 sq.ft",
    tag: "Premium",
  },
  {
    image: property3,
    title: "The Grand Penthouse",
    // location: "BKC, Mumbai",
    // price: "₹8.9 Cr",
    beds: 5,
    baths: 4,
    area: "5,500 sq.ft",
    tag: "Luxury",
  },
];

const FeaturedProperties = () => {
  return (
    <section id="properties" className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Curated Collection
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">
            Featured Properties
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group bg-popover rounded-2xl overflow-hidden shadow-card hover:shadow-luxury transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-sans font-bold px-3 py-1.5 rounded-full">
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <p className="text-accent font-serif text-2xl font-bold mb-1">{p.price}</p>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="flex items-center gap-1.5 text-muted-foreground text-sm font-sans mb-4">
                  <MapPin size={14} /> {p.location}
                </p>
                <div className="flex items-center gap-4 text-muted-foreground text-sm font-sans border-t border-border pt-4">
                  <span className="flex items-center gap-1"><Bed size={14} /> {p.beds} Beds</span>
                  <span className="flex items-center gap-1"><Bath size={14} /> {p.baths} Baths</span>
                  <span className="flex items-center gap-1"><Square size={14} /> {p.area}</span>
                </div>
                <button className="mt-5 w-full bg-primary text-primary-foreground rounded-xl py-3 font-sans font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
