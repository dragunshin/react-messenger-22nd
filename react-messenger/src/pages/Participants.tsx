import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useParticipantsStore } from "../stores/participantsStore";
import RoomInfoHeader from "../components/participants/RoomInfoHeader";
import MediaGallery from "../components/participants/MediaGallery";
import ParticipantList from "../components/participants/ParticipantList";
import RoomActionBar from "../components/participants/RoomActionBar";

export default function Participants() {
  const { roomId = "room-3d" } = useParams();
  const { loadRoomInfo } = useParticipantsStore();

  useEffect(() => {
    loadRoomInfo(roomId);
  }, [roomId, loadRoomInfo]);

  return (
    <div className="h-full bg-white flex flex-col">
      <RoomInfoHeader />
      <MediaGallery />
      <ParticipantList />
      <RoomActionBar />
    </div>
  );
}
