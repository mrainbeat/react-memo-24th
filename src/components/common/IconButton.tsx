interface IconButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function IconButton({ icon, label, onClick, className = "size-8" }: IconButtonProps) {
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
