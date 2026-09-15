import { SAMPLE_MEMOS } from "../constants/sampleMemos";

const STORAGE_KEY = "memo-list";

export function loadMemos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === null ? SAMPLE_MEMOS : JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveMemos(memos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
}
