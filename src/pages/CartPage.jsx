import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenContainer from "../components/ScreenContainer";
import Button from "../components/Button";
import Input from "../components/Input";
import QuantitySelector from "../Coffee/QuantitySelector";
import { useCartStore, selectTotal } from "../store/cartStore";
import { formatCurrency } from "../utils/formatCurrency";

export default function CartPage() {
  const navigate = useNavigate();
  const [addressChoice, setAddressChoice] = useState("home");
  const [customAddress, setCustomAddress] = useState("");
  const items = useCartStore((s) => s.items);
  const total = useCartStore(selectTotal);
  const setQty = useCartStore((s) => s.setQty);
  const placeOrder = useCartStore((s) => s.placeOrder);
  const deliveryAddress = addressChoice === "other"
    ? customAddress.trim()
    : addressChoice === "work"
      ? "Jl. Sudirman No. 21"
      : "Jl. Kpg Sutoyo";

  if (items.length === 0) {
    return (
      <ScreenContainer>
        <div className="empty-state">
          <p>Your next favorite is waiting.</p>
          <Button onClick={() => navigate("/home#menu")}>Browse the menu</Button>
        </div>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <div className="list">
        {items.map((i) => (
          <div key={i.id} className="card row cart-item">
            {i.image
              ? <img className="cart-thumb" src={i.image} alt={i.name} />
              : <span style={{ fontSize: "2rem" }}>{i.emoji}</span>}
            <div style={{ flex: 1 }}>
              <h3>{i.name}</h3>
              <p className="price">{formatCurrency(i.price * i.qty)}</p>
            </div>
            <QuantitySelector value={i.qty} min={0} onChange={(v) => setQty(i.id, v)} />
          </div>
        ))}
      </div>
      <fieldset className="delivery-address">
        <legend>Delivery address</legend>
        <label htmlFor="delivery-address-choice">Choose where to deliver</label>
        <select id="delivery-address-choice" className="input" value={addressChoice}
          onChange={(event) => setAddressChoice(event.target.value)}>
          <option value="home">Home · Jl. Kpg Sutoyo</option>
          <option value="work">Work · Jl. Sudirman No. 21</option>
          <option value="other">Enter another address</option>
        </select>
        {addressChoice === "other" && (
          <Input aria-label="Delivery address" autoComplete="street-address" placeholder="Street, building, and area"
            value={customAddress} onChange={(event) => setCustomAddress(event.target.value)} required />
        )}
      </fieldset>
      <div className="row" style={{ margin: "24px 0 12px" }}>
        <h3>Total</h3>
        <h3>{formatCurrency(total)}</h3>
      </div>
      <Button block disabled={!deliveryAddress} onClick={() => { placeOrder(deliveryAddress); navigate("/tracking"); }}>Place order</Button>
    </ScreenContainer>
  );
}