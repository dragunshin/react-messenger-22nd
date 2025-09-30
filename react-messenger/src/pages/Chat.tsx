import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropdown from "../components/Dropdown";

const semesters = ["25년 1학기", "24년 2학기", "24년 1학기"];

const ROOM = [
  { id: "room-3d", title: "3D 디자인(1)", name: "장다윤" },
  { id: "room-physical", title: "피지컬 워크숍(1)", name: "윤재영" },
  { id: "room-space", title: "공간디자이너의사고법", name: "조성익" },
  { id: "room-life", title: "라이프스타일브랜드창업", name: "서호영,나훈영" },
  { id: "room-human", title: "휴먼-로봇인터랙션디자인", name: "임덕신,최경윤" },
  { id: "room-product", title: "제품폼팩터스튜디오(1)", name: "임동균" },
];

export default function Chat() {
  const nav = useNavigate();
  const [semester, setSemester] = useState(semesters[0]);

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* 상단 영역 */}
      <header className="px-5 pt-3">
        {/* 타이틀 줄 */}
        <div className="flex items-center justify-between h1-bd text-black">
          {/* 탭 (비활성 톤) */}
          <div className="mt-1 flex items-center gap-3 py-2 body2-sb text-neutral-400 text-[19px]">
            <span className="text-neutral-900 text-2xl">강의실</span>
            <span className="text-neutral-200 text-2xl">그룹챗</span>
            <span className="text-neutral-200 text-2xl">쪽지</span>
          </div>
          {/* 우측 프로필/설정 아이콘 (플레이스홀더) */}
          <button
            type="button"
            className="h-7 w-7 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-gray-500"
            aria-label="profile"
            onClick={() => {}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70">
              <path
                d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <Dropdown
          data={semesters}
          value={semester}
          onChange={setSemester}
          surface="gray" // 하얀/회색 전환: 'white' | 'gray'
          className="self-start" // 좌측 정렬 필요 시
        />
      </header>
      {/* 리스트 */}
      <main className="flex-1">
        <ul className="divide-y divide-neutral-200">
          {ROOM.map((r) => (
            <li key={r.id} className="mt-4 py-3 px-5">
              <button
                type="button"
                onClick={() => nav(`/chat/${r.id}`)}
                className="w-full flex items-center gap-3"
              >
                {/* 아바타 */}
                <div className="h-12 w-12 rounded-full bg-gray-400 shrink-0" />
                {/* 타이틀/이름 */}
                <div className="flex-1 text-left">
                  <div className="text-[16px] font-medium text-neutral-800">{r.title}</div>
                  <div className="text-[12px] text-neutral-500">{r.name}</div>
                </div>
                {/* 우측 + 아이콘 (회색 버튼) */}
                <div
                  className="h-7 w-7 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500"
                  aria-hidden
                >
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M11 11V6h2v5h5v2h-5v5h-2v-5H6v-2h5z" fill="currentColor" />
                  </svg>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
