import { useMemo, useState } from "react";
import type { Tag } from "../constants/tag";
import MemoBoard from "../components/board/MemoBoard";
import MemoEditor from "../components/editor/MemoEditor";
import TopBar from "../components/header/TopBar";
import MemoView from "../components/modal/MemoView";
import Modal from "../components/modal/Modal";
import { useMemos } from "../hooks/useMemos";
import { useAuthStore } from "../stores/authStore";
import type { MemoContent } from "../types/memo";
import { filterMemos } from "../utils/memo";

export default function MemoPage() {
  const { memos, addMemo, updateMemo, deleteMemo, togglePin } = useMemos();
  const logout = useAuthStore((s) => s.logout);
  const [keyword, setKeyword] = useState("");
  const [activeTag, setActiveTag] = useState<Tag | null>(null);
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);
  // null: 편집 화면 닫힘 , { memoId: null }: 새 메모 작성 , { memoId }: 기존 메모 수정
  const [editor, setEditor] = useState<{ memoId: string | null } | null>(null);

  const filteredMemos = useMemo(
    () => filterMemos(memos, keyword, activeTag),
    [memos, keyword, activeTag],
  );

  const selectedMemo = memos.find((memo) => memo.id === selectedMemoId);
  const closeModal = () => setSelectedMemoId(null);

  const handleDelete = () => {
    if (selectedMemoId === null) return;
    if (!window.confirm("이 메모를 삭제할까요?")) return;
    deleteMemo(selectedMemoId);
    closeModal();
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃할까요?")) logout();
  };

  if (editor) {
    const editingMemo = memos.find((memo) => memo.id === editor.memoId);

    const handleSubmit = (content: MemoContent) => {
      if (editingMemo) updateMemo(editingMemo.id, content);
      else addMemo(content);
      setEditor(null);
    };

    return (
      <MemoEditor
        memo={editingMemo}
        defaultTag={activeTag ?? "daily"}
        onCancel={() => setEditor(null)}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="mx-auto max-w-[1248px] px-6 pt-12 pb-24">
      <TopBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        activeTag={activeTag}
        onTagChange={setActiveTag}
        onAddClick={() => setEditor({ memoId: null })}
        onProfileClick={handleLogout}
      />
      <MemoBoard
        memos={filteredMemos}
        hasAnyMemo={memos.length > 0}
        onOpen={setSelectedMemoId}
        onTogglePin={togglePin}
      />

      {selectedMemo && (
        <Modal onClose={closeModal}>
          <MemoView
            memo={selectedMemo}
            onClose={closeModal}
            onEdit={() => {
              closeModal();
              setEditor({ memoId: selectedMemo.id });
            }}
            onDelete={handleDelete}
          />
        </Modal>
      )}
    </div>
  );
}
