import { Link } from "react-router-dom";
import CoffeeImage from "./CoffeeImage";
import { formatCurrency } from "../utils/formatCurrency";
import { useFavoritesStore } from "../store/favoritesStore";
import { useCartStore } from "../store/cartStore";

export default function CoffeeCard({ coffee }) {
  const isFav = useFavoritesStore((s) => s.ids.includes(coffee.id));
  const toggle = useFavoritesStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="card">
      <button
        className="fav-btn"
        aria-label="Toggle favorite"
        aria-pressed={isFav}
        onClick={() => toggle(coffee.id)}
      >
        {isFav ? "❤️" : "🤍"}
      </button>
      <Link to={`/product/${coffee.id}`}>
        <div className="card-photo">
          <CoffeeImage coffee={coffee} />
          <span className="rating-badge">⭐ {coffee.rating}</span>
        </div>
        <h3>{coffee.name}</h3>
        <p className="muted">{coffee.category} · {coffee.description}</p>
      </Link>
      <div className="card-footer">
        <p className="price">{formatCurrency(coffee.price)}</p>
        <button className="card-add" onClick={() => addItem(coffee)} aria-label={`Add ${coffee.name} to your order`}>
          <span aria-hidden="true">+</span><span className="card-add-label">Add</span>
        </button>
      </div>
    </div>
  );
}