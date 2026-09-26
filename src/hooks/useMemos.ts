import { useEffect, useState } from "react";
import type { Memo, MemoContent } from "../types/memo";
import { formatDate, generateId } from "../utils/memo";
import { loadMemos, saveMemos } from "../utils/storage";

export function useMemos() {
  const [memos, setMemos] = useState<Memo[]>(() => loadMemos());

  useEffect(() => {
    saveMemos(memos);
  }, [memos]);

  const addMemo = (content: MemoContent) => {
    const now = new Date();
    const memo: Memo = {
      ...content,
      id: generateId(),
      date: formatDate(now),
      createdAt: now.getTime(),
      pinned: false,
    };
    setMemos((prev) => [...prev, memo]);
  };

  const updateMemo = (id: string, changes: Partial<MemoContent>) => {
    setMemos((prev) => prev.map((memo) => (memo.id === id ? { ...memo, ...changes } : memo)));
  };

  const togglePin = (id: string) => {
    setMemos((prev) =>
      prev.map((memo) => (memo.id === id ? { ...memo, pinned: !memo.pinned } : memo)),
    );
  };

  const deleteMemo = (id: string) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  };

  return { memos, addMemo, updateMemo, deleteMemo, togglePin };
}
