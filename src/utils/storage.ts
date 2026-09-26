import { SAMPLE_MEMOS } from "../constants/sampleMemos";
import type { Memo } from "../types/memo";

const STORAGE_KEY = "memo-list";

export function loadMemos(): Memo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === null ? SAMPLE_MEMOS : JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveMemos(memos: Memo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
}
