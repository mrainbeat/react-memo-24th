import { partition, sortByNewest } from "../../utils/memo";
import EmptyState from "./EmptyState";
import MemoCard from "./MemoCard";
import SearchEmpty from "./SearchEmpty";

export default function MemoBoard({ memos, hasAnyMemo, onOpen, onTogglePin }) {
  if (memos.length === 0) {
    return hasAnyMemo ? <SearchEmpty /> : <EmptyState />;
  }

  const [pinned, others] = partition(sortByNewest(memos), (memo) => memo.pinned);
  const groups = [pinned, others].filter((group) => group.length > 0);

  return (
    <main className="flex flex-col gap-5">
      {groups.map((group) => (
        <div key={group[0].pinned ? "pinned" : "others"} className="flex flex-wrap gap-5">
          {group.map((memo) => (
            <MemoCard key={memo.id} memo={memo} onOpen={onOpen} onTogglePin={onTogglePin} />
          ))}
        </div>
      ))}
    </main>
  );
}
