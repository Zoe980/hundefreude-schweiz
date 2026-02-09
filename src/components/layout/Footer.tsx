import { Link } from "react-router-dom";
import { Dog, Heart, Shield, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Dog className="w-6 h-6" />
              Hundfinder.ch
            </Link>
            <p className="text-sm opacity-70">
              Ihre Plattform für den verantwortungsvollen Hundekauf in der Schweiz.
              Wir vermitteln Kontakte zu seriösen Züchtern und Tierheimen.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/rassen" className="hover:opacity-100 transition-opacity">Hunderassen</Link></li>
              <li><Link to="/anbieter" className="hover:opacity-100 transition-opacity">Anbieter</Link></li>
              <li><Link to="/quiz" className="hover:opacity-100 transition-opacity">Rassen-Quiz</Link></li>
              <li><Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link></li>
              <li><Link to="/events" className="hover:opacity-100 transition-opacity">Events</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Für Anbieter</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/eintragen" className="hover:opacity-100 transition-opacity">Jetzt eintragen</Link></li>
              <li><Link to="/eintragen" className="hover:opacity-100 transition-opacity">Pakete & Preise</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/datenschutz" className="hover:opacity-100 transition-opacity">Datenschutz</Link></li>
              <li><Link to="/impressum" className="hover:opacity-100 transition-opacity">Impressum</Link></li>
              <li><Link to="/agb" className="hover:opacity-100 transition-opacity">AGB</Link></li>
              <li><Link to="/kontakt" className="hover:opacity-100 transition-opacity">Kontakt</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm opacity-70">
            <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Tierschutz</span>
            <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> Seriöse Vermittlung</span>
          </div>
          <p className="text-sm opacity-50">© 2025 Hundfinder.ch – Alle Rechte vorbehalten</p>
        </div>
      </div>
    </footer>
  );
}
