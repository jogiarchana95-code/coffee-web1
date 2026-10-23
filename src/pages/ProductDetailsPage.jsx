import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScreenContainer from "../components/ScreenContainer";
import Button from "../components/Button";
import CoffeeImage from "../Coffee/CoffeeImage";
import QuantitySelector from "../Coffee/QuantitySelector";
import { getCoffeeById } from "../services/CoffeeService";
import { formatCurrency } from "../utils/formatCurrency";
import { useCartStore } from "../store/cartStore";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const [coffee, setCoffee] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => { getCoffeeById(id).then(setCoffee); }, [id]);

  if (!coffee) return <ScreenContainer><p className="empty">Loading...</p></ScreenContainer>;

  const handleAdd = () => { addItem(coffee, qty); navigate("/cart"); };

  return (
    <ScreenContainer>
      <CoffeeImage coffee={coffee} large />
      <div className="row" style={{ marginTop: 16 }}>
        <h2>{coffee.name}</h2>
        <span className="price">{formatCurrency(coffee.price)}</span>
      </div>
      <p className="muted">⭐ {coffee.rating} · {coffee.category}</p>
      <p style={{ margin: "16px 0" }}>{coffee.description}</p>
      <div className="row" style={{ marginBottom: 16 }}>
        <QuantitySelector value={qty} onChange={(v) => setQty(Math.max(1, v))} />
        <strong>{formatCurrency(coffee.price * qty)}</strong>
      </div>
      <Button block onClick={handleAdd}>Add to Cart</Button>
    </ScreenContainer>
  );
}