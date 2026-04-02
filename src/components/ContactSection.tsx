import { Send, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-secondary">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-accent font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Get in Touch
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
              Let's Find Your{" "}
              <span className="text-gold italic">Perfect Home</span>
            </h2>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-10">
              Ready to take the next step? Our expert consultants are here to guide you through every stage of your property journey.
            </p>

            <div className="space-y-6">
              {[
                { icon: Phone, label: "+91 98765 43210" },
                { icon: Mail, label: "hello@nlvrealty.com" },
                { icon: MapPin, label: "Tower A, Business Park, Gurugram, India" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <item.icon size={20} className="text-accent" />
                  </div>
                  <span className="font-sans text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-popover rounded-2xl p-8 shadow-luxury space-y-5"
          >
            {[
              { name: "name" as const, label: "Full Name", type: "text", placeholder: "John Doe" },
              { name: "email" as const, label: "Email", type: "email", placeholder: "john@example.com" },
              { name: "phone" as const, label: "Phone", type: "tel", placeholder: "+91 98765 43210" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  value={formData[field.name]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className="w-full bg-muted rounded-xl px-4 py-3 text-foreground font-sans text-sm outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
              </div>
            ))}
            <div>
              <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your dream property..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-muted rounded-xl px-4 py-3 text-foreground font-sans text-sm outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground py-4 rounded-xl font-sans font-bold flex items-center justify-center gap-2 shadow-gold transition-all hover:scale-[1.02]"
            >
              <Send size={18} /> Send Enquiry
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
