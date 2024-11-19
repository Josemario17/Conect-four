import { create } from "zustand";

type GameState = {
    matriz: (string | null)[][]; 
    currentPlayer: string; 
    gameStatus: string; 
    makeMove: (column: number) => void;
    reiniciar: () => void;
    checkWinner: () => void;
    checkDraw: () => void;
  };

const checkForWin = (matriz: (string | null)[][], player: string): boolean => {
    // Verificar horizontal
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (matriz[row][col] === player && matriz[row][col + 1] === player && matriz[row][col + 2] === player && matriz[row][col + 3] === player) {
          return true;
        }
      }
    }
  
    // Verificar vertical
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
        if (matriz[row][col] === player && matriz[row + 1][col] === player && matriz[row + 2][col] === player && matriz[row + 3][col] === player) {
          return true;
        }
      }
    }
  
    // Verificar diagonal (diagonal positiva)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (matriz[row][col] === player && matriz[row + 1][col + 1] === player && matriz[row + 2][col + 2] === player && matriz[row + 3][col + 3] === player) {
          return true;
        }
      }
    }
  
    // Verificar diagonal (diagonal negativa)
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (matriz[row][col] === player && matriz[row - 1][col + 1] === player && matriz[row - 2][col + 2] === player && matriz[row - 3][col + 3] === player) {
          return true;
        }
      }
    }
  
    return false;
  };

  const empate = (matriz: (string | null)[][]): boolean => {
    return matriz.every(row => row.every(cell => cell !== null));
  };

  export const useGameRuntineStore = create<GameState>((set) => ({
    matriz: Array(6).fill(null).map(() => Array(7).fill(null)),
    currentPlayer: "player1", 
    gameStatus: 'ongoing', 
    
    // Função para fazer uma jogada
    makeMove: (column: number) => {
      set((state) => {
        if (state.gameStatus !== 'ongoing') return {}; // Não faz jogada se o jogo não estiver em andamento
        for (let row = 5; row >= 0; row--) {
          if (state.matriz[row][column] === null) {
            const newmatriz = [...state.matriz];
            newmatriz[row][column] = state.currentPlayer;
            
            // Verificar vitória ou empate após a jogada
            const isWinner = checkForWin(newmatriz, state.currentPlayer);
            const isDraw = empate(newmatriz);
  
            if (isWinner) {
              alert(`${state.currentPlayer} venceu!`);
              return { matriz: newmatriz, gameStatus: 'win' };
            } else if (isDraw) {
              alert('Empate!');
              return { matriz: newmatriz, gameStatus: 'draw' };
            }
  
            // Alterna o jogador
            return {
              matriz: newmatriz,
              currentPlayer: state.currentPlayer === 'player1' ? 'player2' : 'player1',
            };
          }
        }
  
        return {};
      });
    },
  
    // reiniciar o jogo
    reiniciar: () => {
      set({
        matriz: Array(6).fill(null).map(() => Array(7).fill(null)),
        currentPlayer: 'player1',
        gameStatus: 'ongoing',
      });
    },
  
    // verificar vencedor
    checkWinner: () => {
      set((state) => {
        if (checkForWin(state.matriz, state.currentPlayer)) {
          alert(`${state.currentPlayer} venceu!`);
          return { gameStatus: 'win' };
        }
        return {};
      });
    },
  
    //verificar empate
    checkDraw: () => {
      set((state) => {
        if (empate(state.matriz)) {
          alert('Empate!');
          return { gameStatus: 'draw' };
        }
        return {};
      });
    },
  }));

