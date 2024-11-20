import {create} from 'zustand'

type optionsData = {
    name: string,
}

type gameSteps = "gameOptions" | "game" | "gameOver"

interface StepsStore {
    GameStep: gameSteps;
    gameOptions: optionsData;
    ModalHistoric: boolean;
    setStep: (stepItem: gameSteps) => void, 
    addOptions: (options: optionsData) => void,
    openModalHistoric: () => void,
    closeModalHistoric: () => void,
}

export const useGameStore = create<StepsStore>((set) => ({
    GameStep: "gameOptions",
    gameOptions: {
        name: "",
    },
    ModalHistoric: false,
    setStep: (stepItem : gameSteps) => set({ GameStep: stepItem }),
    addOptions: (options: optionsData) => set({ gameOptions: options }),
    openModalHistoric: () => set({ ModalHistoric: true }),
    closeModalHistoric: () => set({ ModalHistoric: false }),
}))

