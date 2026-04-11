import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Save } from "lucide-react";
import luxury1 from "@/assets/luxury-1.jpg";
import luxury2 from "@/assets/luxury-2.jpg";
import luxury3 from "@/assets/luxury-3.jpg";

const EnquireNowSidebar = () => {
  const [useLightTheme, setUseLightTheme] = useState(false);

  useEffect(() => {
    const getEffectiveBackground = (element: Element | null) => {
      let current = element as HTMLElement | null;

      while (current && current !== document.body) {
        const styles = window.getComputedStyle(current);
        const backgroundColor = styles.backgroundColor;

        if (backgroundColor && backgroundColor !== "rgba(0, 0, 0, 0)" && backgroundColor !== "transparent") {
          return backgroundColor;
        }

        current = current.parentElement;
      }

      return window.getComputedStyle(document.body).backgroundColor;
    };

    const isGreenBackground = (color: string) => {
      const match = color.match(/\d+/g);
      if (!match || match.length < 3) return false;

      const [r, g, b] = match.slice(0, 3).map(Number);
      return g >= 110 && g > r * 1.15 && g > b * 1.1;
    };

    const updateSidebarTheme = () => {
      const button = document.querySelector("[data-enquire-btn]") as HTMLElement | null;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const probeX = Math.max(0, rect.left - 8);
      const probeY = Math.min(window.innerHeight - 1, Math.max(0, rect.top + rect.height / 2));
      const elementBehind = document.elementFromPoint(probeX, probeY);
      const backgroundColor = getEffectiveBackground(elementBehind);

      setUseLightTheme(isGreenBackground(backgroundColor));
    };

    window.addEventListener("scroll", updateSidebarTheme, { passive: true });
    window.addEventListener("resize", updateSidebarTheme);
    updateSidebarTheme();

    return () => {
      window.removeEventListener("scroll", updateSidebarTheme);
      window.removeEventListener("resize", updateSidebarTheme);
    };
  }, []);

  return (
    <a
      href="#contact"
      data-enquire-btn
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 font-sans font-bold text-xs tracking-[0.2em] uppercase px-2 py-6 rounded-l-lg shadow-lg hover:px-3 transition-all duration-300 ${
        useLightTheme ? "bg-primary-foreground text-accent" : "bg-accent text-accent-foreground"
      }`}
      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
    >
      ENQUIRE NOW
    </a>
  );
};

const initialProjects = [
  {
    id: 1,
    image: luxury1,
    name: "NLV Skyline Tower",
    location: "Sector 84, Gurugram",
    config: "3 BHK · 3.5 BHK · 4.5 BHK",
  },
  {
    id: 2,
    image: luxury2,
    name: "NLV Twin Residences",
    location: "Sector 63, Gurugram",
    config: "2.5 BHK · 3 BHK · 4 BHK",
  },
  {
    id: 3,
    image: luxury3,
    name: "NLV Grand Villas",
    location: "Whitefield, Bangalore",
    config: "4 BHK · 5 BHK · Penthouse",
  },
];

const LuxuryShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [projectsList, setProjectsList] = useState(initialProjects);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token);
  }, []);

  const handleEdit = (p: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(p.id);
    setEditForm({ ...p });
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProjectsList(projectsList.map(p => p.id === editForm.id ? editForm : p));
    setEditingId(null);
    // TODO: Send updated property data to backend API to save permanently
  };

  useEffect(() => {
    if (editingId) return; // Pause auto-slide while editing
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projectsList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [editingId, projectsList.length]);

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-primary" data-enquire-theme="light">
      {/* Decorative circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-white/15 absolute" />
        <div className="w-[800px] h-[800px] rounded-full border border-white/10 absolute" />
      </div>

      {/* Sticky Enquire Now sidebar */}
      <EnquireNowSidebar />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-bold uppercase">
            <span className="text-white">LUXURY BEYOND THE</span>
            <br />
            <span className="text-white font-normal">ORDINARY</span>
          </h2>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {projectsList.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-700 ${
                activeIndex === i
                  ? "ring-2 ring-accent shadow-[0_0_40px_rgba(76,175,80,0.3)]"
                  : "ring-1 ring-accent/20"
              }`}
              onClick={() => {
                if (!editingId) setActiveIndex(i);
              }}
            >
              {isAdmin && editingId !== project.id && (
                <button 
                  onClick={(e) => handleEdit(project, e)}
                  className="absolute z-20 set top-2 right-2 p-2 bg-yellow-500/90 hover:bg-yellow-600 text-white rounded-full shadow-lg transition-all"
                  title="Edit Showcase"
                >
                  <Edit size={16} />
                </button>
              )}

              {editingId === project.id ? (
                // Edit Form UI
                <div className="p-4 bg-slate-900/95 backdrop-blur-sm h-full w-full absolute inset-0 z-30 flex flex-col gap-3 justify-center" onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-white font-bold mb-1 text-center">Edit Mode</h3>
                  <input className="p-2 rounded bg-slate-800 text-sm text-white w-full max-w-xs mx-auto" value={editForm.image} onChange={(e) => setEditForm({...editForm, image: e.target.value})} placeholder="Image URL" />
                  <input className="p-2 rounded bg-slate-800 text-sm text-white w-full max-w-xs mx-auto" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} placeholder="Project Name" />
                  <input className="p-2 rounded bg-slate-800 text-sm text-white w-full max-w-xs mx-auto" value={editForm.location} onChange={(e) => setEditForm({...editForm, location: e.target.value})} placeholder="Location" />
                  <input className="p-2 rounded bg-slate-800 text-sm text-white w-full max-w-xs mx-auto" value={editForm.config} onChange={(e) => setEditForm({...editForm, config: e.target.value})} placeholder="Configuration (e.g. 3 BHK)" />
                  <div className="mt-2 flex justify-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); setEditingId(null); }} className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer text-sm">Cancel</button>
                    <button onClick={handleSave} className="flex items-center gap-1 font-semibold px-3 py-1 bg-emerald-500 text-white rounded cursor-pointer text-sm"><Save size={14} /> Save</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative h-[350px] md:h-[420px] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${project.name}-${activeIndex === i ? "active" : "idle"}`}
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                        width={800}
                        height={1024}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: activeIndex === i ? 1.05 : 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                    </AnimatePresence>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Active indicator */}
                    {activeIndex === i && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 border-2 border-accent rounded-2xl"
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
                    <p className="font-serif text-lg font-bold">{project.name}</p>
                    {project.location && <p className="text-sm text-accent font-sans">{project.location}</p>}
                    <p className="text-xs text-primary-foreground/70 font-sans mt-1">{project.config}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {projectsList.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeIndex === i
                  ? "w-8 bg-accent"
                  : "w-2 bg-primary-foreground/30 hover:bg-primary-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Enquire Now button */}
        <div className="text-center mt-10">
          <a
            href="#contact"
            className="inline-block bg-accent text-accent-foreground font-sans font-bold px-10 py-4 rounded-full text-sm tracking-wider uppercase hover:scale-105 transition-transform"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default LuxuryShowcase;
