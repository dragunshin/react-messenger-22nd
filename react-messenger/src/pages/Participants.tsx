import { useNavigate } from "react-router-dom";

// 더미 데이터 - 실제로는 props나 API로 받아올 것
const DUMMY_PARTICIPANTS = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `학생 ${i + 1}`,
  profileUrl: "/icons/profile.svg",
  isMe: i === 0, // 첫 번째가 나
}));

const DUMMY_MEDIA = [
  { id: 1, url: "", type: "image" },
  { id: 2, url: "", type: "image" },
  { id: 3, url: "", type: "image" },
];

export default function Participants() {
  const nav = useNavigate();
  // TODO: roomId를 useParams()로 받아서 실제 데이터 로드

  return (
    <div className="h-full bg-white flex flex-col">
      {/* 강의실 정보 */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-[12px] text-red-500 mb-1">강의실</p>
            <h1 className="text-[20px] font-bold text-gray-900">3D 디자인(1)</h1>
            <p className="text-[14px] text-gray-500 mt-1">장다윤</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-1 py-6 rounded-full" aria-label="링크">
              <img src="/icons/link.svg" alt="링크" className="w-5 h-5" />
            </button>
            <button className="px-1 py-6 rounded-full" aria-label="즐겨찾기">
              <img src="/icons/star.svg" alt="즐겨찾기" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 사진, 동영상 */}
      <div className="px-4 py-4 border-b border-gray-100">
        <h2 className="text-[16px] font-normal text-gray-500 mb-3">
          사진, 동영상 <span className="text-[12px] text-gray-400">{DUMMY_MEDIA.length}</span>
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {DUMMY_MEDIA.map((media) => (
            <div
              key={media.id}
              className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
            >
              <img
                src={media.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 참여자 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <h2 className="text-[16px] font-normal text-gray-500 mb-3">
          참여자 <span className="text-gray-400">{DUMMY_PARTICIPANTS.length}</span>
        </h2>
        <ul className="space-y-4">
          {DUMMY_PARTICIPANTS.map((participant) => (
            <li key={participant.id} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden shrink-0">
                <img
                  src={participant.profileUrl}
                  alt={participant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="flex-1 text-[12px] text-black flex items-center gap-1">
                {participant.isMe && (
                  <span className="flex items-center justify-center w-4 h-4 p-1 bg-red-100 text-red-400 rounded text-[10px]">
                    나
                  </span>
                )}
                {participant.name}
              </span>
              <button
                className="p-2 rounded-full"
              >
                <img src="/icons/chat-bubble-btn.svg" alt="채팅" className="w-7 h-7" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 하단 액션 바 */}
      <div className="px-4 border-t border-gray-100 flex items-center justify-between">
        <button
          className="flex items-center gap-2 text-[14px] text-gray-600"
          onClick={() => nav(-1)}
        >
          <img src="/icons/exit.svg" alt="나가기" className="w-4 h-4" />
          채팅방 나가기
        </button>
        <div className="flex items-center gap-3">
          <button
            className="py-6 rounded-full"
            aria-label="알림 끄기"
          >
            <img src="/icons/notification-off.svg" alt="알림 끄기" className="w-5 h-5" />
          </button>
          <button
            className="px-1 py-6 rounded-full"
            aria-label="설정"
          >
            <img src="/icons/setting.svg" alt="설정" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
