import { create } from "zustand";
import { useGameStore } from "./StepsStore";

type PlayerKey = "player1" | "player2";

type GameRunPlayers = {
    player1: string;
    player2: string;
    player1Jogadas: number;
    player2Jogadas: number;
    player1Wins: number;
    player2Wins: number;
};

type GameRunCurrentGame = {
    firstTurn: PlayerKey;
    playerTurn: PlayerKey;
    AllMoves: number,
    Result: PlayerKey | "draw";
    SessionGameNumber: number;
    alertResult: boolean,
};

type GameRunProprieties = {
    players: GameRunPlayers;
    currentGame: GameRunCurrentGame;
    columns: string[][];
    setPlayers: (players: GameRunPlayers) => void;
    setCurrentGame: (currentGame: GameRunCurrentGame) => void;
    setWins: (player: PlayerKey) => void;
    setAlertResult: (alertResult: boolean) => void;
    handleButtonClick: (colIndex: number) => void,
    restartGame: ( columns: string[][]) => void;
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
        firstTurn: useGameStore.getState().gameOptions.firstTurn,
        playerTurn: useGameStore.getState().gameOptions.firstTurn,
        Result: "draw",
        AllMoves: 0,
        SessionGameNumber: 0,
        alertResult: false,
    },
    columns: Array.from({ length: 7 }, () => Array(6).fill("empty")),
    setPlayers: (players) => set({ players }),
    setCurrentGame: (currentGame) => set({ currentGame }),
    setWins: (player) => set({ players: { ...get().players, [`${player}Wins`]: get().players[`${player}Wins`] + 1 } }),
    setAlertResult: (alertResult) => set({ currentGame: { ...get().currentGame, alertResult: alertResult } }),

    handleButtonClick: (colIndex) => {
        const { columns, currentGame, players } = get();
        const lastEmptyIndex = columns[colIndex].lastIndexOf("empty");
        if (lastEmptyIndex === -1) return;

        const updatedPlayers = {
            ...players,
            [`${currentGame.playerTurn}Jogadas`]: players[`${currentGame.playerTurn}Jogadas`] + 1,
        };

        set({
            columns: columns.map((col, i) =>
                i === colIndex ? col.map((cell, j) => (j === lastEmptyIndex ? currentGame.playerTurn : cell)) : col
            ),
            players: updatedPlayers,
            currentGame: {
                ...currentGame,
                AllMoves:  players.player1Jogadas + players.player2Jogadas,
                playerTurn: currentGame.playerTurn === "player1" ? "player2" : "player1",
            },
        });
    },

    restartGame: (columns) => {
        const { players, currentGame } = get();
        set({
            columns: columns.map((col) => col.map(() => "empty")),
            players: {
                ...players,
                player1Jogadas: 0,
                player2Jogadas: 0,
            },
            currentGame: {
                ...currentGame,
                playerTurn: currentGame.firstTurn,
            },
        });
    }
}));
