import { Link, useNavigate } from "react-router-dom";
import { useCartStore, selectCount } from "../store/cartStore";

export default function Header({ title, showBack = false }) {
  const navigate = useNavigate();
  const count = useCartStore(selectCount);
  return (
    <header className="header">
      {showBack && (
        <button className="back" onClick={() => navigate(-1)} aria-label="Back">←</button>
      )}
      <h1>{title}</h1>
    </header>
  );
}