import { useState } from "react";

export default function CoffeeImage({ coffee, large = false }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`coffee-img ${large ? "large" : ""}`}>
      {failed || !coffee.image ? (
        <span className="coffee-image-fallback" role="img" aria-label={`${coffee.name} image unavailable`}>
          {coffee.emoji || "☕"}
        </span>
      ) : (
        <img src={coffee.image} alt={coffee.name} loading="lazy" decoding="async"
          onError={() => setFailed(true)} />
      )}
    </div>
  );
}