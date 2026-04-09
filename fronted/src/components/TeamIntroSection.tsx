import { motion } from "framer-motion";
import teamPhoto from "@/assets/team-photo.jpg";

const TeamIntroSection = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Heading */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight">
              ADDING REAL
              <br />
              VALUE TO
              <br />
              YOUR <span className="text-accent">DREAMS</span>
            </h2>
          </motion.div>

          {/* Right - Team Photo + Description */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-luxury">
              <img
                src={teamPhoto}
                alt="NLV Leadership Team"
                loading="lazy"
                width={1280}
                height={720}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-6 bg-popover rounded-xl p-6 shadow-card">
              <p className="text-accent font-serif font-bold text-lg mb-2">At NLV,</p>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                we know that little things make a big impact. Like, ensuring optimal use of
                resources results in timely completion of projects, adhering to best practices
                and using the finest materials ensure better, stronger structures...
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamIntroSection;
