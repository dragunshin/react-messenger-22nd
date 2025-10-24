import { useNavigate } from "react-router-dom";

export default function RoomActionBar() {
  const nav = useNavigate();

  return (
    <div className="px-4 border-t border-gray-100 flex items-center justify-between">
      <button
        className="flex items-center gap-2 text-[14px] text-gray-400"
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
  );
}
