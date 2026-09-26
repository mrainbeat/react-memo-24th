import { useState } from "react";
import iconBack from "../../assets/icons/icon-back.svg";
import { TAG_STYLES } from "../../constants/tag";
import { formatDate } from "../../utils/memo";
import IconButton from "../common/IconButton";
import MemoMeta from "../modal/MemoMeta";

export default function MemoEditor({ memo, defaultTag, onCancel, onSubmit }) {
  const [title, setTitle] = useState(memo?.title ?? "");
  const [content, setContent] = useState(memo?.content ?? "");
  const [tag, setTag] = useState(memo?.tag ?? defaultTag);
  const [date] = useState(() => memo?.date ?? formatDate(new Date()));

  const canSubmit = title.trim() !== "" && content.trim() !== "";
  const { editorBg, placeholder } = TAG_STYLES[tag];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ title: title.trim(), content: content.trim(), tag });
  };

  return (
    <div className="min-h-screen bg-white-00">
      <div className="mx-auto max-w-[1120px] pt-[92px] pb-[168px]">
        <IconButton
          icon={iconBack}
          label="뒤로가기"
          onClick={onCancel}
          className="block size-8"
        />

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-11 flex w-[600px] flex-col gap-8"
        >
          <div
            className={`flex size-[600px] flex-col gap-8 rounded-3xl px-10 pt-11 pb-10 text-white-00 shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${editorBg}`}
          >
            <div className="flex flex-col gap-6">
              <input
                autoFocus
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요..."
                maxLength={40}
                className={`w-full bg-transparent text-heading-lg outline-none ${placeholder}`}
              />
              <MemoMeta tag={tag} date={date} onTagChange={setTag} />
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="본문을 입력하세요..."
              className={`-mr-7 min-h-0 grow resize-none bg-transparent pr-7 text-body-lg outline-none [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white-00/60 ${placeholder}`}
            />
          </div>

          <div className="flex h-14 gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 cursor-pointer rounded-[18px] bg-gray-01 text-action-md text-gray-03 hover:bg-gray-02 hover:text-gray-01"
            >
              작성 취소
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className={`flex-1 rounded-[18px] text-action-md text-white-00 ${canSubmit ? "cursor-pointer bg-[#1b4ef5]" : "cursor-not-allowed bg-blue-03"}`}
            >
              {memo ? "수정 완료" : "작성 완료"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
