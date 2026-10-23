import { useEffect, useState } from "react";
import heroCoffee from "../assets/Image Onboarding.png";
import promoBanner from "../assets/Banner.png";
import ScreenContainer from "../components/ScreenContainer";
import Input from "../components/Input";
import CoffeeCard from "../Coffee/CoffeeCard";
import { getCoffees } from "../services/CoffeeService";

const categories = [
  { label: "All Coffee", value: "All" },
  { label: "Hot Coffee", value: "Hot" },
  { label: "Iced Coffee", value: "Cold" },
];

export default function HomePage() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    getCoffees()
      .then((data) => setCoffees(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = coffees.filter(
    (c) =>
      (category === "All" || c.category === category) &&
      c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScreenContainer>
      <div className="storefront">
        <section className="home-hero" aria-label="Coffee shop">
          <div className="hero-copy">
            <p className="eyebrow">GOOD THINGS ARE BREWING</p>
            <h1>Your daily ritual, <em>made better.</em></h1>
            <p className="hero-description">Discover a new favorite, made fresh and just the way you like it.</p>
            <a className="hero-link" href="#menu">Explore the menu <span aria-hidden="true">→</span></a>
            <p className="hero-note"><span aria-hidden="true">●</span> Handcrafted with care, every single day</p>
          </div>
          <div className="hero-visual">
            <img className="hero-photo" src={heroCoffee} alt="Freshly brewed coffee" />
            <span className="hero-seal">YOUR<br />COFFEE<br />MOMENT</span>
          </div>
        </section>

        <a className="promo-link" href="#menu" aria-label="Buy one coffee, get one free">
          <img className="promo-banner" src={promoBanner} alt="Buy one coffee, get one free" />
        </a>

        <section className="menu-section" id="menu">
          <div className="menu-heading">
            <div>
              <p className="eyebrow">YOUR NEXT FAVORITE</p>
              <h2>Find your drink</h2>
            </div>
            <p className="menu-caption">{coffees.length} handcrafted drinks</p>
          </div>
          <div className="menu-toolbar">
            <div className="chips" role="group" aria-label="Filter coffee categories">
              {categories.map(({ label, value }) => (
                <button key={value} className={`chip ${category === value ? "active" : ""}`} aria-pressed={category === value}
                  onClick={() => setCategory(value)}>{label}</button>
              ))}
            </div>
            <label className="search-field">
              <span aria-hidden="true">⌕</span>
              <Input aria-label="Search coffee" placeholder="Search the menu" value={query}
                onChange={(event) => setQuery(event.target.value)} />
            </label>
          </div>
          {loading ? <p className="empty">Preparing your menu...</p> : (
            <div className="grid">
              {filtered.map((coffee) => <CoffeeCard key={coffee.id} coffee={coffee} />)}
            </div>
          )}
          {!loading && filtered.length === 0 && <p className="empty">No drinks match that search. Try another name or category.</p>}
        </section>
      </div>
    </ScreenContainer>
  );
}