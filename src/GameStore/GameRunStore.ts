import { create } from "zustand";
import { useGameStore } from "./StepsStore";

type GameRunPlayers = {
  player1: string;
  player2: string;
  player1Jogadas: number;
  player2Jogadas: number;
  player1Wins: number;
  player2Wins: number;
};

type GameRunCurrentGame = {
  firstTurn: "random" | "player1" | "player2";
  playerTurn: "random" | "player1" | "player2";
  Result: "player1" | "player2" | "draw"; 
  SessionGameNumber: number; 
};

type GameRunColumns = string[][];

type GameRunProprieties = {
  players: GameRunPlayers;
  currentGame: GameRunCurrentGame;
  columns: GameRunColumns;
  setPlayers: (players: GameRunPlayers) => void;
  setCurrentGame: (currentGame: GameRunCurrentGame) => void;
  handleButtonClick: (colIndex: number) => void;
};

export const useGameRunStore = create<GameRunProprieties>((set, get) => ({
  players: {
    player1: "",
    player2: "",
    player1Jogadas: 0,
    player2Jogadas: 0,
    player1Wins: 0,
    player2Wins: 0,
  },
  currentGame: {
    firstTurn: useGameStore.getState().gameOptions.firstTurn === "random"
      ? (Math.random() > 0.5 ? "player1" : "player2")
      : useGameStore.getState().gameOptions.firstTurn,
    playerTurn: useGameStore.getState().gameOptions.firstTurn === "random"
      ? (Math.random() > 0.5 ? "player1" : "player2")
      : useGameStore.getState().gameOptions.firstTurn,
    Result: "draw",
    SessionGameNumber: 0,
  },
  columns: new Array(7).fill(0).map(() => new Array(6).fill("empty")), 
  setPlayers: (players) => set({ players }),
  setCurrentGame: (currentGame) => set({ currentGame }),

  handleButtonClick: (colIndex) => {
    const { columns, currentGame, players } = get();
    const { playerTurn, firstTurn } = currentGame;

    const lastEmptyIndex = columns[colIndex].lastIndexOf("empty");

    if (lastEmptyIndex !== -1) {
        const updatedPlayers = { ...players };
  
        if (playerTurn === "player1") {
          updatedPlayers.player1Jogadas += 1;
        } else{
          updatedPlayers.player2Jogadas += 1;
        }
      const updatedColumns = columns.map((col) => [...col]); 
      updatedColumns[colIndex][lastEmptyIndex] = playerTurn; 
      const nextTurn = playerTurn === "player1" ? "player2" : "player1";

      set({
        columns: updatedColumns,
        players: updatedPlayers,
        currentGame: { ...currentGame, playerTurn: nextTurn },
      });

      console.log(`começou: ${firstTurn}`);
    }
  },
}));
