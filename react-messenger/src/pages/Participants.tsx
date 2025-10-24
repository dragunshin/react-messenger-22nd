import RoomInfoHeader from "../components/participants/RoomInfoHeader";
import MediaGallery from "../components/participants/MediaGallery";
import ParticipantList from "../components/participants/ParticipantList";
import RoomActionBar from "../components/participants/RoomActionBar";

export default function Participants() {
  return (
    <div className="h-full bg-white flex flex-col">
      <RoomInfoHeader />
      <MediaGallery />
      <ParticipantList />
      <RoomActionBar />
    </div>
  );
}
