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
  loadParticipants: () => void;
  loadRoomInfo: (roomId: string) => void;
}

export const useParticipantsStore = create<ParticipantsStore>((set) => ({
  participants: [],
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
  loadParticipants: async () => {
    try {
      const response = await fetch("/data/users.json");
      const data = await response.json();
      set({ participants: data.users || [] });
    } catch (error) {
      console.error("Failed to load participants:", error);
    }
  },
  loadRoomInfo: async (roomId: string) => {
    try {
      const response = await fetch("/data/rooms.json");
      const data = await response.json();
      const room = data.rooms.find((r: { id: string }) => r.id === roomId);
      if (room) {
        set({
          roomInfo: {
            roomType: "강의실",
            roomName: room.title,
            instructor: room.name,
          },
        });
      }
    } catch (error) {
      console.error("Failed to load room info:", error);
    }
  },
}));
