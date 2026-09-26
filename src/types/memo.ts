import type { Tag } from "../constants/tag";

export interface Memo {
  id: string;
  title: string;
  content: string;
  tag: Tag;
  date: string;
  createdAt: number;
  pinned: boolean;
}

export type MemoContent = Pick<Memo, "title" | "content" | "tag">;
