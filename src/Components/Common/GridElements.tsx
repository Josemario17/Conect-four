import React, { useEffect, useState, useRef } from 'react'
import { useGameRuntineStore } from '../../GameStore/GameRuntine';
import { useGameRunStore } from '../../GameStore/GameRunStore';
import { ResultMessage } from '../Layout/GameArea';
import Celula from './Celula';

const BoardGrid = () => {
    const { columns, handleButtonClick, currentGame, restartGame, setWins, setAlertResult } = useGameRunStore();
    const { checkDraw, checkForWin } = useGameRuntineStore()
    const [result, setResult] = useState({
        alert: false,
        type: "win" as "draw" | "win",
        text: ["", ""]
    });
    const columnsRef = useRef<HTMLDivElement[]>([]);

    const slideDisc = (colIndex: number, emptyRow: number) => {
        const fallingDisc = document.createElement("div");
        fallingDisc.className = `absolute w-10 h-10 rounded-full ${currentGame.playerTurn === "player1" ? "bg-green-500" : "bg-orange-500"}`;
        fallingDisc.style.top = "0";
        fallingDisc.style.transition = "top 0.5s ease-out";
        columnsRef.current[colIndex].appendChild(fallingDisc);

        setTimeout(() => {
            fallingDisc.style.top = `${emptyRow * 60}px`;
        }, 0);

        setTimeout(() => {
            fallingDisc.remove();
            handleButtonClick(colIndex);
        }, 500);
    }

    useEffect(() => {
        if (currentGame.AllMoves < 7) return;

        if (currentGame.AllMoves > 40) {
            if (checkDraw(columns)) {
                setResult({ alert: true, type: "draw", text: ["Owww", "houve um empate, vamos novamente?"] });
                setAlertResult(true);
                setTimeout(() => { restartGame(columns) }, 3000);
            }
        } else {
            if (checkForWin(columns, "player1")) {
                setWins("player1");
                setResult({ alert: true, type: "win", text: ["Parabéns", "Player 1 você ganhou, vamos novamente?"] });
                setAlertResult(true);
                setTimeout(() => { restartGame(columns) }, 3000);
            } else if (checkForWin(columns, "player2")) {
                setWins("player2");
                setResult({ alert: true, type: "win", text: ["Parabéns", "Player 2 você ganhou, vamos novamente?"] });
                setAlertResult(true);
                setTimeout(() => { restartGame(columns) }, 3000);
            }
        }

    }, [columns]);

    return (
        <>
            <div className="p-6 grid grid-cols-7 gap-4">
                {columns?.map((column, colIndex) => {
                    const emptyRow = column.lastIndexOf("empty");
                    return (
                        <div key={colIndex} className="relative">
                            <button
                                className="p-2 pb-2 rounded-xl grid items-center justify-center hover:bg-zinc-400/20 duration-150"
                                onClick={() => slideDisc(colIndex, emptyRow)}
                            >
                                <div id={`column-${colIndex}`} className="relative" ref={el => el ? columnsRef.current[colIndex] = el : null}>
                                    {column.map((state, lineIndex) => (
                                        <Celula
                                            key={`${colIndex}-${lineIndex}`}
                                            selectedState={{ seletion: state === "player1" ? "player1" : state === "player2" ? "player2" : "empty" }}
                                        ></Celula>
                                    ))}
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>

            {currentGame.alertResult && <ResultMessage type={result.type} text={result.text} />}
        </>
    );
};

export default BoardGrid;
