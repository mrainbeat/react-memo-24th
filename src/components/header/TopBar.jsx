import iconAddMemoBtn from "../../assets/icons/button-add-memo.svg";
import iconProfileBtn from "../../assets/icons/button-profile.svg";
import IconButton from "../common/IconButton";
import TagSelect from "../common/TagSelect";
import SearchInput from "./SearchInput";

export default function TopBar({ keyword, onKeywordChange, activeTag, onTagChange, onAddClick }) {
  return (
    <header className="mb-8 flex items-center gap-6">
      <div className="flex grow items-center gap-3 rounded-[28px] bg-white-00 p-4">
        <TagSelect value={activeTag} onChange={onTagChange} includeAll />
        <SearchInput value={keyword} onChange={onKeywordChange} />
      </div>
      <IconButton icon={iconAddMemoBtn} label="새 메모 작성" onClick={onAddClick} className="size-20" />
      <IconButton icon={iconProfileBtn} label="프로필" className="size-20" />
    </header>
  );
}
