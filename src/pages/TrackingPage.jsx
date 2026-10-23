import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenContainer from "../components/ScreenContainer";
import driverIcon from "../assets/Detail Driver.png";
import bikeIcon from "../assets/Driver.png";
import { useCartStore } from "../store/cartStore";
import { formatCurrency } from "../utils/formatCurrency";

export default function TrackingPage() {
  const Navigate = useNavigate();
  const order = useCartStore((state) => state.activeOrder);
  const [contactMessage, setContactMessage] = useState(false);

  useEffect(() => {
    if (!order) Navigate("/home", { replace: true });
  }, [Navigate, order]);

  if (!order) return null;

  const itemCount = order.items.reduce((count, item) => count + item.qty, 0);

  return (
    <ScreenContainer>
      <div className="tracking-page">
        <section className="tracking-summary" aria-label="Delivery progress">
          <div className="tracking-handle" aria-hidden="true" />
          <p className="eyebrow">ORDER IN PROGRESS</p>
          <h2>10 minutes left</h2>
          <p>Delivery to <strong>{order.address}</strong></p>
          <div className="tracking-progress" role="img" aria-label="Order confirmed, preparing, courier pickup, delivery">
            <span className="complete" />
            <span className="complete" />
            <span />
            <span />
          </div>
          <div className="tracking-status">
            <strong>Preparing your order</strong>
            <p>Your coffee is being made fresh before courier pickup.</p>
          </div>
        </section>

        <section className="tracking-map" aria-label={`Bike courier route from the coffee shop to ${order.address}`}>
          <div className="tracking-route-line" aria-hidden="true" />
          <div className="tracking-map-location start">
            <span className="tracking-map-symbol" aria-hidden="true">☕</span>
            <span><strong>Coffee shop</strong><small>Order pickup</small></span>
          </div>
          <div className="tracking-map-location destination">
            <span className="tracking-map-symbol home" aria-hidden="true">⌂</span>
            <span><strong>Your home</strong><small>{order.address}</small></span>
          </div>
          <div className="tracking-bike" aria-label="Bike courier on the way">
            <img src={bikeIcon} alt="Bike courier" />
          </div>
        </section>

        <section className="tracking-courier" aria-label="Delivery partner">
          <img src={driverIcon} alt="Delivery partner" />
          <div className="tracking-courier-copy">
            <p>Delivery partner</p>
            <h3>Brooklyn Simmons</h3>
            <p>Personal courier</p>
          </div>
          <button className="tracking-call" type="button" aria-label="Courier contact details"
            onClick={() => setContactMessage((visible) => !visible)}>
            ☎
          </button>
        </section>
        {contactMessage && <p className="tracking-note" role="status">Courier contact becomes available when a delivery service is connected.</p>}
        <section className="tracking-order-details" aria-label="Order details">
          <div className="tracking-order-heading">
            <div><p className="eyebrow">ORDER #{String(order.id).slice(-6)}</p><h3>Your order</h3></div>
            <strong>{formatCurrency(order.total)}</strong>
          </div>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                <span>{item.qty} × {item.name}</span>
                <span>{formatCurrency(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
          <p className="tracking-item-count">{itemCount} {itemCount === 1 ? "drink" : "drinks"} in this order</p>
        </section>
        <p className="tracking-note">Illustrated tracking preview. Live courier location requires a delivery service connection.</p>
      </div>
    </ScreenContainer>
  );
}