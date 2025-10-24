import { useParticipantsStore } from "../../stores/participantsStore";
import ParticipantItem from "./ParticipantItem";

export default function ParticipantList() {
  const { participants } = useParticipantsStore();

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <h2 className="text-[16px] font-normal text-gray-500 mb-3">
        참여자 <span className="text-gray-400">{participants.length}</span>
      </h2>
      <ul className="space-y-4">
        {participants.map((participant) => (
          <ParticipantItem
            key={participant.id}
            id={participant.id}
            name={participant.name}
            profileUrl={participant.profileUrl}
            isMe={participant.isMe}
          />
        ))}
      </ul>
    </div>
  );
}
