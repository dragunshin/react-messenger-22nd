import { create } from "zustand";

interface Participant {
  id: number;
  name: string;
  profileUrl: string;
  isMe: boolean;
}

interface Media {
  id: number;
  url: string;
  type: string;
}

interface RoomInfo {
  roomType: string;
  roomName: string;
  instructor: string;
}

interface ParticipantsStore {
  participants: Participant[];
  media: Media[];
  roomInfo: RoomInfo;
  setParticipants: (participants: Participant[]) => void;
  setMedia: (media: Media[]) => void;
  setRoomInfo: (roomInfo: RoomInfo) => void;
}

export const useParticipantsStore = create<ParticipantsStore>((set) => ({
  participants: Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `학생 ${i + 1}`,
    profileUrl: "/icons/profile.svg",
    isMe: i === 0,
  })),
  media: [
    { id: 1, url: "", type: "image" },
    { id: 2, url: "", type: "image" },
    { id: 3, url: "", type: "image" },
  ],
  roomInfo: {
    roomType: "강의실",
    roomName: "3D 디자인(1)",
    instructor: "장다윤",
  },
  setParticipants: (participants) => set({ participants }),
  setMedia: (media) => set({ media }),
  setRoomInfo: (roomInfo) => set({ roomInfo }),
}));
