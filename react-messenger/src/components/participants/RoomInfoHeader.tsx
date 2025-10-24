import { useParticipantsStore } from "../../stores/participantsStore";

export default function RoomInfoHeader() {
  const { roomInfo } = useParticipantsStore();

  return (
    <div className="px-4 py-4 border-b border-gray-100">
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="text-[12px] text-red-500 mb-1">{roomInfo.roomType}</p>
          <h1 className="text-[20px] font-bold text-gray-900">{roomInfo.roomName}</h1>
          <p className="text-[14px] text-gray-500 mt-1">{roomInfo.instructor}</p>
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
  );
}
