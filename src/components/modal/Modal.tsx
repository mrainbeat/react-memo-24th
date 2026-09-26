import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  label: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ label, children, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement;
    if (!dialog.open) dialog.showModal();

    return () => {
      dialog.close();
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none items-center justify-center bg-transparent p-6 open:flex backdrop:bg-[rgba(0,27,81,0.5)]"
    >
      {children}
    </dialog>
  );
}
