import iconEmptyStateAdd from "../../assets/icons/empty-state-icon.svg";

export default function EmptyState() {
  return (
    <div className="flex min-h-[480px] w-full flex-col items-center justify-center gap-7 rounded-3xl border-2 border-dashed border-blue-02 text-center">
      <img src={iconEmptyStateAdd} alt="" className="size-30" />
      <p className="text-heading-md text-blue-02">새로운 메모를 작성해보세요!</p>
    </div>
  );
}
