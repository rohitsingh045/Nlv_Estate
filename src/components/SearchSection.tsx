import { Search, MapPin, DollarSign, Home } from "lucide-react";
import { motion } from "framer-motion";

const SearchSection = () => {
  return (
    <section className="relative -mt-12 z-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="container mx-auto"
      >
        <div className="bg-popover rounded-2xl shadow-luxury p-6 md:p-8">
          <p className="font-serif text-xl font-semibold text-foreground mb-6">
            Find Your Perfect Property
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
              <MapPin size={20} className="text-accent shrink-0" />
              <div className="w-full">
                <label className="text-xs font-sans text-muted-foreground">Location</label>
                <select className="w-full bg-transparent text-foreground font-sans text-sm outline-none mt-0.5">
                  <option>All Locations</option>
                  <option>Mumbai</option>
                  <option>Delhi NCR</option>
                  <option>Bangalore</option>
                  <option>Hyderabad</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
              <DollarSign size={20} className="text-accent shrink-0" />
              <div className="w-full">
                <label className="text-xs font-sans text-muted-foreground">Budget</label>
                <select className="w-full bg-transparent text-foreground font-sans text-sm outline-none mt-0.5">
                  <option>Any Budget</option>
                  <option>Under ₹50 Lakhs</option>
                  <option>₹50L - ₹1 Cr</option>
                  <option>₹1 Cr - ₹3 Cr</option>
                  <option>Above ₹3 Cr</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
              <Home size={20} className="text-accent shrink-0" />
              <div className="w-full">
                <label className="text-xs font-sans text-muted-foreground">Property Type</label>
                <select className="w-full bg-transparent text-foreground font-sans text-sm outline-none mt-0.5">
                  <option>All Types</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Penthouse</option>
                  <option>Plot</option>
                </select>
              </div>
            </div>

            <button className="bg-primary text-primary-foreground rounded-xl px-6 py-3 font-sans font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-luxury">
              <Search size={18} />
              Search
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SearchSection;
