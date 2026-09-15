import { useEffect, useState } from "react";
import { formatDate, generateId } from "../utils/memo";
import { loadMemos, saveMemos } from "../utils/storage";

export function useMemos() {
  const [memos, setMemos] = useState(() => loadMemos());

  useEffect(() => {
    saveMemos(memos);
  }, [memos]);

  const addMemo = (content) => {
    const now = new Date();
    const memo = {
      ...content,
      id: generateId(),
      date: formatDate(now),
      createdAt: now.getTime(),
      pinned: false,
    };
    setMemos((prev) => [...prev, memo]);
  };

  const updateMemo = (id, changes) => {
    setMemos((prev) => prev.map((memo) => (memo.id === id ? { ...memo, ...changes } : memo)));
  };

  const togglePin = (id) => {
    setMemos((prev) =>
      prev.map((memo) => (memo.id === id ? { ...memo, pinned: !memo.pinned } : memo)),
    );
  };

  const deleteMemo = (id) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  };

  return { memos, addMemo, updateMemo, deleteMemo, togglePin };
}
