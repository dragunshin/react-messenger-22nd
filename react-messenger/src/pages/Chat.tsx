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
      <header className="pt-3">
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
            onClick={() => nav("/profile")}
          >
            <img src="/icons/profile.svg" alt="profile" className="w-6 h-6 opacity-70" aria-label="profile"/>
          </button>
        </div>

        <Dropdown
          data={semesters}
          value={semester}
          onChange={setSemester}
          surface="gray" // 하얀/회색 전환: 'white' | 'gray'
          className="self-start" // 좌측 정렬 필요 시
        />
        {/* 리스트 */}
      <main className="flex-1">
        <ul className="divide-y divide-neutral-200">
          {ROOM.map((r) => (
            <li key={r.id} className="mt-4 py-3 px-2">
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
                {/* 우측 + 아이콘 */}
                <img src="icons/chat-bubble-btn.svg" alt="plus" className="w-7 h-7" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </main>
      </header>
      
    </div>
  );
}
