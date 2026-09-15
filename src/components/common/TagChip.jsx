import { TAG_STYLES } from "../../constants/tag";

export default function TagChip({ tag }) {
  const { dot, label, text } = TAG_STYLES[tag];

  return (
    <span className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[28px] bg-blue-01 py-1 pr-6 pl-3">
      <img src={dot} alt="" className="size-5" />
      <span className={`text-action-md ${text}`}>{label}</span>
    </span>
  );
}
