import iconClose from "../../assets/icons/icon-close.svg";
import iconEdit from "../../assets/icons/icon-edit.svg";
import iconTrash from "../../assets/icons/icon-trash.svg";
import { TAG_STYLES } from "../../constants/tag";
import IconButton from "../common/IconButton";
import MemoMeta from "./MemoMeta";

export default function MemoView({ memo, onClose, onEdit, onDelete }) {
  return (
    <section
      className={`flex max-h-[90vh] w-full max-w-[556px] flex-col gap-8 overflow-y-auto rounded-3xl px-11 py-10 text-white-00 shadow-[0_4px_24px_rgba(0,0,0,0.25)] ${TAG_STYLES[memo.tag].bg}`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="break-words text-heading-lg">{memo.title}</h2>
          <IconButton icon={iconClose} label="닫기" onClick={onClose} />
        </div>
        <MemoMeta tag={memo.tag} date={memo.date} />
      </div>
      <p className="whitespace-pre-wrap break-words text-body-lg">{memo.content}</p>
      <div className="flex justify-end gap-3">
        <IconButton icon={iconEdit} label="수정" onClick={onEdit} />
        <IconButton icon={iconTrash} label="삭제" onClick={onDelete} />
      </div>
    </section>
  );
}
