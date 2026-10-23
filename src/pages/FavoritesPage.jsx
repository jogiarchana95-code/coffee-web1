import { useEffect, useState } from "react";
import ScreenContainer from "../components/ScreenContainer";
import CoffeeCard from "../Coffee/CoffeeCard";
import { getCoffees } from "../services/CoffeeService";
import { useFavoritesStore } from "../store/favoritesStore";

export default function FavoritesPage() {
  const ids = useFavoritesStore((s) => s.ids);
  const [coffees, setCoffees] = useState([]);

  useEffect(() => { getCoffees().then(setCoffees); }, []);

  const favorites = coffees.filter((c) => ids.includes(c.id));

  return (
    <ScreenContainer>
      {favorites.length === 0
        ? <p className="empty">No favorites yet. Tap the ❤️ on a coffee.</p>
        : <div className="grid">{favorites.map((c) => <CoffeeCard key={c.id} coffee={c} />)}</div>}
    </ScreenContainer>
  );
}