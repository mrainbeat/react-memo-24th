import Button from "../common/Button";
import Modal from "./Modal";

interface AlertModalProps {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
}

export default function AlertModal({ title, description, confirmLabel, onConfirm }: AlertModalProps) {
  return (
    <Modal onClose={onConfirm}>
      <div
        role="alertdialog"
        aria-modal="true"
        className="flex h-60 w-full max-w-[480px] flex-col items-center justify-between rounded-3xl bg-white-00 px-8 pt-12 pb-6 shadow-[0_8px_12px_rgba(0,0,0,0.18)]"
      >
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-heading-md text-blue-07">{title}</p>
          <p className="text-body-sm text-gray-04">{description}</p>
        </div>
        <Button type="button" autoFocus onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
