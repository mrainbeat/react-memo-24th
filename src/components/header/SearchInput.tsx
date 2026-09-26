import { useRef } from "react";
import iconSearchBar from "../../assets/icons/search-bar-icon.svg";
import IconButton from "../common/IconButton";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="원하는 메모를 검색하세요"
        className="min-w-0 grow bg-transparent text-field-md text-blue-07 outline-none placeholder:text-gray-02"
      />
      <IconButton
        icon={iconSearchBar}
        label="검색"
        onClick={() => inputRef.current?.focus()}
        className="size-12"
      />
    </>
  );
}
