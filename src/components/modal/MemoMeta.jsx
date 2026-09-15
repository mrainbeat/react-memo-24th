import TagChip from "../common/TagChip";
import TagSelect from "../common/TagSelect";

export default function MemoMeta({ tag, date, onTagChange }) {
  return (
    <div className="flex items-center gap-6">
      {onTagChange ? <TagSelect value={tag} onChange={onTagChange} /> : <TagChip tag={tag} />}
      <span className="h-13 w-[3px] rounded-sm bg-white-00" />
      <span className="text-heading-sm">{date}</span>
    </div>
  );
}
