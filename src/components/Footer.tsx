import NLVLogo from "./NLVLogo";

const Footer = () => (
  <footer className="bg-charcoal py-16 px-6">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-1">
          <NLVLogo className="text-primary-foreground mb-4" />
          <p className="font-sans text-primary-foreground/60 text-sm leading-relaxed">
            Crafting extraordinary living experiences with premium quality and unwavering trust.
          </p>
        </div>
        {[
          { title: "Quick Links", links: ["Properties", "About Us", "Testimonials", "Contact"] },
          { title: "Property Types", links: ["Apartments", "Villas", "Penthouses", "Plots"] },
          { title: "Cities", links: ["Gurugram", "Mumbai", "Bangalore", "Hyderabad"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-serif text-primary-foreground font-semibold mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="font-sans text-primary-foreground/50 text-sm hover:text-accent transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10 pt-8 text-center">
        <p className="font-sans text-primary-foreground/40 text-sm">
          © 2026 NLV Realty. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
