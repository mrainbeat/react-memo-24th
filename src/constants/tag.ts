import dotDaily from "../assets/icons/dot-daily.svg";
import dotWork from "../assets/icons/dot-work.svg";
import dotOthers from "../assets/icons/dot-others.svg";

export const TAGS = ["daily", "work", "others"];

export const TAG_STYLES = {
  daily: {
    label: "Daily",
    dot: dotDaily,
    bg: "bg-blue-03",
    text: "text-blue-04",
    footer: "font-semibold text-blue-01",
    editorBg: "bg-blue-04",
    placeholder: "placeholder:text-blue-03",
  },
  work: {
    label: "Work",
    dot: dotWork,
    bg: "bg-blue-06",
    text: "text-blue-06",
    footer: "font-normal text-white-00",
    editorBg: "bg-blue-06",
    placeholder: "placeholder:text-blue-03",
  },
  others: {
    label: "Others",
    dot: dotOthers,
    bg: "bg-gray-02",
    text: "text-gray-03",
    footer: "font-normal text-white-00",
    editorBg: "bg-gray-02",
    placeholder: "placeholder:text-gray-01",
  },
};
