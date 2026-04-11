import { MapPin, Bed, Bath, Square, ArrowRight, Edit, Save } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const initialProperties = [
  {
    id: 1,
    image: property1,
    title: "Skyline Residences",
    location: "Sector 63, Gurugram",
    price: "₹1.2 Cr",
    beds: 3,
    baths: 2,
    area: "1,850 sq.ft",
    tag: "New Launch",
  },
  {
    id: 2,
    image: property2,
    title: "Palm Vista Villa",
    location: "Whitefield, Bangalore",
    price: "₹3.5 Cr",
    beds: 4,
    baths: 3,
    area: "3,200 sq.ft",
    tag: "Premium",
  },
  {
    id: 3,
    image: property3,
    title: "The Grand Penthouse",
    location: "BKC, Mumbai",
    price: "₹8.9 Cr",
    beds: 5,
    baths: 4,
    area: "5,500 sq.ft",
    tag: "Luxury",
  },
];

const FeaturedProperties = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [properties, setProperties] = useState(initialProperties);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token);
  }, []);

  const handleEdit = (p: any) => {
    setEditingId(p.id);
    setEditForm({ ...p });
  };

  const handleSave = () => {
    setProperties(properties.map(p => p.id === editForm.id ? editForm : p));
    setEditingId(null);
    // TODO: Send updated property data to backend API to save permanently
    // fetch('/api/admin/properties', { method: 'PUT', body: JSON.stringify(editForm) })
  };

  return (
    <section id="properties" className="py-24 px-6 relative">
      <div className="container mx-auto">
        <motion.div
// ... existing code ...
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
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-popover rounded-2xl overflow-hidden shadow-card hover:shadow-luxury transition-all duration-500"
            >
              {isAdmin && editingId !== p.id && (
                <button 
                  onClick={() => handleEdit(p)}
                  className="absolute z-10 top-2 right-2 p-2 bg-yellow-500/90 hover:bg-yellow-600 text-white rounded-full shadow-lg transition-all"
                  title="Edit Property"
                >
                  <Edit size={16} />
                </button>
              )}

              {editingId === p.id ? (
                // Edit Mode UI
                <div className="p-4 bg-slate-900 h-full flex flex-col gap-3 z-20 relative">
                  <h3 className="text-white font-bold mb-2">Edit Mode</h3>
                  <input className="p-2 rounded bg-slate-800 text-sm text-white" value={editForm.image} onChange={(e) => setEditForm({...editForm, image: e.target.value})} placeholder="Image URL" />
                  <input className="p-2 rounded bg-slate-800 text-sm text-white" value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} placeholder="Property Title" />
                  <input className="p-2 rounded bg-slate-800 text-sm text-white" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} placeholder="Price" />
                  <input className="p-2 rounded bg-slate-800 text-sm text-white" value={editForm.location} onChange={(e) => setEditForm({...editForm, location: e.target.value})} placeholder="Location" />
                  <div className="flex gap-2">
                    <input type="number" className="p-2 rounded bg-slate-800 text-sm w-1/2 text-white" value={editForm.beds} onChange={(e) => setEditForm({...editForm, beds: e.target.value})} placeholder="Beds" />
                    <input type="number" className="p-2 rounded bg-slate-800 text-sm w-1/2 text-white" value={editForm.baths} onChange={(e) => setEditForm({...editForm, baths: e.target.value})} placeholder="Baths" />
                  </div>
                  <input className="p-2 rounded bg-slate-800 text-sm text-white" value={editForm.area} onChange={(e) => setEditForm({...editForm, area: e.target.value})} placeholder="Area (sq ft)" />
                  <div className="mt-auto flex justify-end gap-2 p-2">
                    <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer">Cancel</button>
                    <button onClick={handleSave} className="flex items-center gap-1 font-semibold px-3 py-1 bg-emerald-500 text-white rounded cursor-pointer"><Save size={14} /> Save</button>
                  </div>
                </div>
              ) : (
                // Normal UI
                <>
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
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
