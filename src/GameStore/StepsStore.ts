import {create} from 'zustand'

type optionsData = {
    name: string,
    firstTurn: "random" | "player1" | "player2",
    timeToTurn: "20" | "40"
}

type gameSteps = "gameOptions" | "game" | "gameOver"

interface StepsStore {
    GameStep: gameSteps;
    gameOptions: optionsData;
    setStep: (stepItem: gameSteps) => void, 
    addOptions: (options: optionsData) => void
}

export const useGameStore = create<StepsStore>((set) => ({
    GameStep: "gameOptions",
    gameOptions: {
        name: "",
        firstTurn: "player1",
        timeToTurn: "40"
    },
    setStep: (stepItem : gameSteps) => set({ GameStep: stepItem }),
    addOptions: (options: optionsData) => set({ gameOptions: options })
}))

