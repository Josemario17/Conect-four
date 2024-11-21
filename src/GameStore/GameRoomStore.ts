import { create } from "zustand";

type GameRoom = {
    id: string;
    players: string[];
}

export const useGameRoomStore = create((set) => ({
  gameRoom: null,
  setGameRoom: (GameRoom : GameRoom) => set({ gameRoom: GameRoom }),
}));