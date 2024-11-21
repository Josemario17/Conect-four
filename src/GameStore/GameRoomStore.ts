import { create } from "zustand";

type GameRoom = {
    id: string;
    players: string[];
}

type GameRoomStore = {
    gameRoom: GameRoom | null;
    setGameRoom: (gameRoom: GameRoom) => void;
}

export const useGameRoomStore = create((set) => ({
  gameRoom: null,
  setGameRoom: (GameRoom : GameRoom) => set({ gameRoom: GameRoom }),
}));