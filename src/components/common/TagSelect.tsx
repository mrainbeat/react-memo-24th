import { useEffect, useRef, useState } from "react";
import iconDropdownArrow from "../../assets/icons/dropdown-arrow.svg";
import { TAGS, TAG_STYLES } from "../../constants/tag";
import TagChip from "./TagChip";

export default function TagSelect({ value, onChange, includeAll = false }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleMouseDown = (e) => {
      if (!containerRef.current.contains(e.target)) setOpen(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selectTag = (tag) => {
    onChange(tag);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer"
      >
        {value ? (
          <TagChip tag={value} />
        ) : (
          <span className="inline-flex h-9 items-center gap-2 rounded-[36px] bg-blue-01 px-4 text-action-sm text-blue-07">
            태그 선택
            <img
              src={iconDropdownArrow}
              alt=""
              className={`h-4 w-[13px] transition-transform duration-150 ${open ? "rotate-0" : "-rotate-90"}`}
            />
          </span>
        )}
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-[calc(100%+8px)] left-0 z-20 w-[150px] rounded-2xl bg-white-00 p-2 shadow-[0_12px_32px_rgba(0,27,81,0.18)]"
        >
          {includeAll && (
            <li>
              <button
                type="button"
                onClick={() => selectTag(null)}
                className="flex w-full cursor-pointer items-center rounded-xl px-3 py-2.5 text-action-sm text-blue-07 hover:bg-blue-01"
              >
                전체보기
              </button>
            </li>
          )}
          {TAGS.map((tag) => (
            <li key={tag}>
              <button
                type="button"
                role="option"
                aria-selected={value === tag}
                onClick={() => selectTag(tag)}
                className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-action-sm text-blue-07 hover:bg-blue-01 ${value === tag ? "bg-blue-01" : ""}`}
              >
                <img src={TAG_STYLES[tag].dot} alt="" className="size-3.5" />
                {TAG_STYLES[tag].label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
