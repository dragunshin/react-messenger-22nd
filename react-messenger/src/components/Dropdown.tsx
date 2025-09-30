import { useState, useEffect, useRef } from "react";
import "../App.css";

type DropdownProps = {
  data: string[];
  value?: string;
  onChange?: (val: string) => void;
  /* 닫힌(선택 표시) 상태 배경: 'white' | 'gray' */
  surface?: "white" | "gray";
  className?: string;
};

export default function Dropdown({
  data,
  value,
  onChange,
  surface = "white",
  className = "",
}: DropdownProps) {
  const list = data ?? [];
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(list[0] ?? "");
  const selected = value ?? internal;

  const ref = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const setSelected = (v: string) => {
    setInternal(v);
    onChange?.(v);
    setOpen(false);
  };

  const surfaceClass = surface === "gray" ? "bg-[#F2F2F2]" : "bg-white";

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* 셀렉트 박스 (336x41, p: 8/10) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-[298px] h-[41px] ${surfaceClass}
        rounded-[10px] border border-[#D9D9D9]
        px-3 py-2
        text-[16px] text-neutral-800
        flex items-center justify-between
        focus:outline-none focus:ring-2 focus:#E9E9E9`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{selected}</span>
        <span
          className={`ml-[10px] text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ⌵
        </span>
      </button>

      {/* 옵션 목록 (top: 38px, w 100%, max-h 200px, 스크롤) */}
      <ul
        role="listbox"
        className={`absolute left-0 z-10 w-[298px]
        mt-[10px] rounded-[10px] bg-[#FEFEFE]
        text-[16px] shadow-md overflow-y-auto overflow-hidden
        transition-all ${open ? "max-h-[200px] border border-[#CCCCCC]" : "max-h-0 border-0"}
        `}
        style={{ top: "38px" }}
      >
        {list.map((item) => {
          const active = item === selected;
          return (
            <li
              key={item}
              role="option"
              aria-selected={active}
              onClick={() => setSelected(item)}
              className={`px-[10px] py-2 cursor-pointer
              ${active ? "bg-white" : ""}
              hover:text-white
              hover:bg-gradient-to-br hover:from-[#5658DF] hover:to-[#2F6DD0]
              transition-colors`}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
