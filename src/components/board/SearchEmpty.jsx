import iconSearchEmpty from "../../assets/icons/search-empty-icon.svg";

export default function SearchEmpty() {
  return (
    <div className="flex min-h-[480px] w-full flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed border-blue-07 text-center">
      <div className="flex size-24 items-center justify-center rounded-full bg-blue-07">
        <img src={iconSearchEmpty} alt="" className="size-12" />
      </div>
      <div>
        <p className="text-action-sm text-blue-07">검색 결과가 없습니다</p>
        <p className="mt-2 text-body-sm text-gray-03">다른 검색어로 다시 시도해보세요</p>
      </div>
    </div>
  );
}
