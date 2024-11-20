import { create } from "zustand";

type GameState = {
    checkForWin: (matriz: string[][], player:string) => true | false;
    checkDraw: (matriz: (string | null)[][]) => true | false;
  };

  const empate = (matriz: (string | null)[][]): boolean => {
    return matriz.every(linha => linha.every(cell => cell !== "empty"));
  };

  export const useGameRuntineStore = create<GameState>((set) => ({
    checkForWin: (matriz: (string | null)[][], player: string): boolean => {
        // Verificar horizontal
        for (let linha = 0; linha < 6; linha++) {
          for (let coluna = 0; coluna < 4; coluna++) {
            if (matriz[linha][coluna] === player && matriz[linha][coluna + 1] === player && matriz[linha][coluna + 2] === player && matriz[linha][coluna + 3] === player) {
              return true;
            }
          }
        }
      
        // Verificar vertical
        for (let coluna = 0; coluna < 7; coluna++) {
          for (let linha = 0; linha < 3; linha++) {
            if (matriz[linha][coluna] === player && matriz[linha + 1][coluna] === player && matriz[linha + 2][coluna] === player && matriz[linha + 3][coluna] === player) {
              return true;
            }
          }
        }
      
        // Verificar diagonal (diagonal positiva)
        for (let linha = 0; linha < 3; linha++) {
          for (let coluna = 0; coluna < 4; coluna++) {
            if (matriz[linha][coluna] === player && matriz[linha + 1][coluna + 1] === player && matriz[linha + 2][coluna + 2] === player && matriz[linha + 3][coluna + 3] === player) {
              return true;
            }
          }
        }
      
        // Verificar diagonal (diagonal negativa)
        for (let linha = 3; linha < 6; linha++) {
          for (let coluna = 0; coluna < 4; coluna++) {
            if (matriz[linha][coluna] === player && matriz[linha - 1][coluna + 1] === player && matriz[linha - 2][coluna + 2] === player && matriz[linha - 3][coluna + 3] === player) {
              return true;
            }
          }
        }
      
        return false;
      },

      checkDraw: (matriz: (string | null)[][]) => {
        if (empate(matriz)) {
          return true;
        }
        return false;
      }
  }));

