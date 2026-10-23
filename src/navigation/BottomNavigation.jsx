import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCartStore, selectCount } from "../store/cartStore";

const tabs = [
  { to: "/home", icon: "⌂", label: "Home" },
  { to: "/home#menu", icon: "☕", label: "Menu", menu: true },
  { to: "/favorites", icon: "♡", label: "Favorites" },
  { to: "/cart", icon: "＋", label: "Order" },
  { to: "/tracking", icon: "↗", label: "Track" },
  { to: "/profile", icon: "○", label: "Profile" },
];

export default function BottomNavigation() {
  const location = useLocation();
  const count = useCartStore(selectCount);
  const activeOrder = useCartStore((state) => state.activeOrder);
  const visibleTabs = tabs.filter((tab) => tab.to !== "/tracking" || activeOrder);

  useEffect(() => {
    if (location.pathname === "/home" && location.hash === "#menu") {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {visibleTabs.map((t) => t.menu ? (
        <Link key={t.to} to={t.to} className={location.pathname === "/home" && location.hash === "#menu" ? "active" : ""}>
          <span className="icon" aria-hidden="true">{t.icon}</span>{t.label}
        </Link>
      ) : (
        <NavLink key={t.to} to={t.to} end={t.to === "/home"}
          onClick={t.to === "/home" ? () => window.scrollTo({ top: 0, behavior: "smooth" }) : undefined}
          className={({ isActive }) => (isActive ? "active" : "")}>
          <span className="icon" aria-hidden="true">{t.icon}</span>
          {t.label}
          {t.to === "/cart" && count > 0 && <span className="badge">{count}</span>}
        </NavLink>
      ))}
    </nav>
  );
}