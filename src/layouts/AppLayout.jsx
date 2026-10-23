import { Outlet, useLocation } from "react-router-dom";
import Header from "../navigation/Header";
import BottomNavigation from "../navigation/BottomNavigation";

const titles = {
  "/home": "Coffee House",
  "/favorites": "Favorites",
  "/cart": "My Cart",
  "/profile": "Profile",
  "/tracking": "Order",
};

export default function AppLayout() {
  const { pathname } = useLocation();
  const isDetails = pathname.startsWith("/product/");

  return (
    <div className="app-shell">
      <Header title={isDetails ? "Details" : titles[pathname] ?? "Coffee Shop"} showBack={isDetails} />
      <BottomNavigation />
      <Outlet />
    </div>
  );
}