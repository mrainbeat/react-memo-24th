import AlertModal from "./AlertModal";

export default function NetworkErrorModal({ onConfirm }: { onConfirm: () => void }) {
  return (
    <AlertModal
      title="네트워크 연결이 불안정합니다"
      description="네트워크 상태를 확인해주세요"
      confirmLabel="확인"
      onConfirm={onConfirm}
    />
  );
}
