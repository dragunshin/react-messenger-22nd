import { memo } from "react";

interface ParticipantItemProps {
  id: number;
  name: string;
  profileUrl: string;
  isMe: boolean;
}

function ParticipantItem({ name, profileUrl, isMe }: ParticipantItemProps) {
  return (
    <li className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden shrink-0">
        <img src={profileUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <span className="flex-1 text-[12px] text-black flex items-center gap-1">
        {isMe && (
          <span className="flex items-center justify-center w-4 h-4 p-1 bg-red-100 text-red-400 rounded text-[10px]">
            나
          </span>
        )}
        {name}
      </span>
      <button className="p-2 rounded-full">
        <img src="/icons/chat-bubble-btn.svg" alt="채팅" className="w-7 h-7" aria-hidden="true" />
      </button>
    </li>
  );
}

export default memo(ParticipantItem);
