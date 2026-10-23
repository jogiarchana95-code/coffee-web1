export default function QuantitySelector({ value, onChange, min = 1 }) {
  return (
    <div className="qty">
      <button onClick={() => onChange(value - 1)} disabled={value <= min && min > 0}>−</button>
      <strong>{value}</strong>
      <button onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}