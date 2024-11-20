import {create} from 'zustand'

type optionsData = {
    name: string,
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
    },
    setStep: (stepItem : gameSteps) => set({ GameStep: stepItem }),
    addOptions: (options: optionsData) => set({ gameOptions: options })
}))

