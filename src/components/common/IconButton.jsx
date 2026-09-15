export default function IconButton({ icon, label, onClick, className = "size-8" }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`shrink-0 cursor-pointer ${className}`}
    >
      <img src={icon} alt="" className="size-full" />
    </button>
  );
}
