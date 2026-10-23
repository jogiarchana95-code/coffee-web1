export default function Button({ variant = "", block = false, children, ...props }) {
  return (
    <button className={`btn ${variant} ${block ? "block" : ""}`} {...props}>
      {children}
    </button>
  );
}