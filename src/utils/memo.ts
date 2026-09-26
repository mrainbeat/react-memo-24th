import type { Tag } from "../constants/tag";
import type { Memo } from "../types/memo";

export function sortByNewest(list: Memo[]) {
  return [...list].sort((a, b) => b.createdAt - a.createdAt);
}

export function partition<T>(list: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const matched: T[] = [];
  const rest: T[] = [];
  list.forEach((item) => {
    if (predicate(item)) matched.push(item);
    else rest.push(item);
  });
  return [matched, rest];
}

export function formatDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}

export function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function filterMemos(memos: Memo[], keyword: string, tag: Tag | null) {
  const normalized = keyword.trim().toLowerCase();
  return memos.filter((memo) => {
    const matchesTag = !tag || memo.tag === tag;
    const matchesKeyword =
      !normalized ||
      memo.title.toLowerCase().includes(normalized) ||
      memo.content.toLowerCase().includes(normalized);
    return matchesTag && matchesKeyword;
  });
}
