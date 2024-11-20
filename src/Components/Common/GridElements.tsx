import React, { useEffect, useState, useRef } from 'react';
import { useGameRuntineStore } from '../../GameStore/GameRuntine';
import { useGameRunStore } from '../../GameStore/GameRunStore';
import { ResultMessage } from '../Layout/GameArea';
import Celula from './Celula';
import { saveLog } from '../../Config/SaveLog';

type propsCostum = {
    column: any;
    colIndex: number;
    emptyRow?: number;
    slideDisc: any;
    columnsRef: any;
    children?: React.ReactNode;
}

type logData = {
    DataHora: string,
    jogadas: string[][],
    resultado: string,
}


const CellButton = ({ colIndex, emptyRow, slideDisc, children, columnsRef }: propsCostum) => {
    return (
        <div key={colIndex} className="relative">
            <button
                className="p-2 pb-2 rounded-xl grid items-center justify-center hover:bg-zinc-400/20 duration-150"
                onClick={() => slideDisc(colIndex, emptyRow)}
            >
                <div id={`column-${colIndex}`} className="relative" ref={el => el ? columnsRef.current[colIndex] = el : null}>
                    {children}
                </div>
            </button>
        </div>
    )
}

const ColumnComponent = ({ column, colIndex, slideDisc, columnsRef }: propsCostum) => {
    const emptyRow = column.lastIndexOf("empty");
    return (
        <CellButton column={column} colIndex={colIndex} emptyRow={emptyRow} slideDisc={slideDisc} columnsRef={columnsRef}>
            {column.map((state: any, lineIndex: number) => (
                <Celula
                    key={`${colIndex}-${lineIndex}`}
                    selectedState={{ seletion: state === "player1" ? "player1" : state === "player2" ? "player2" : "empty" }}
                />
            ))}
        </CellButton>
    );
}


const BoardGrid = () => {
    const { columns, handleButtonClick, currentGame, restartGame, setWins, setAlertResult } = useGameRunStore();
    const { checkDraw, checkForWin } = useGameRuntineStore();
    const [result, setResult] = useState({ alert: false, type: "win" as "draw" | "win", text: ["", ""] });
    const columnsRef = useRef<HTMLDivElement[]>([]);

    const slideDisc = (colIndex: number, emptyRow: number) => {
        const caindoDisco = document.createElement("div");
        caindoDisco.className = `absolute w-10 h-10 rounded-full ${currentGame.playerTurn === "player1" ? "bg-green-500" : "bg-orange-500"}`;
        caindoDisco.style.top = "0";
        caindoDisco.style.transition = "top 0.5s ease-out";
        columnsRef.current[colIndex].appendChild(caindoDisco);

        setTimeout(() => {
            caindoDisco.style.top = `${emptyRow * 60}px`;
        }, 0);

        setTimeout(() => {
            caindoDisco.remove();
            handleButtonClick(colIndex);
        }, 500);
    };

    useEffect(() => {
        if (currentGame.AllMoves < 7) return;

        const handleResult = (type: "draw" | "win", text: [string, string], winner?: "player1" | "player2") => {
            if (winner) setWins(winner);
            setResult({ alert: true, type, text });
            setAlertResult(true);
            saveLog({ DataHora: new Date().toLocaleString(), jogadas: columns, resultado: winner || "draw" });
            setTimeout(() => restartGame(columns), 3000);
        };

        if (currentGame.AllMoves > 40 && checkDraw(columns)) {
            handleResult("draw", ["Owww", "houve um empate, vamos novamente?"]);
        } else if (checkForWin(columns, "player1")) {
            handleResult("win", ["Parabéns", "Player 1 você ganhou, vamos novamente?"], "player1");
        } else if (checkForWin(columns, "player2")) {
            handleResult("win", ["Parabéns", "Player 2 você ganhou, vamos novamente?"], "player2");
        }
    }, [columns]);

    return (
        <>
            <div className="p-6 grid grid-cols-7 gap-4">
                {columns?.map((column, colIndex) => (
                    <ColumnComponent key={colIndex} column={column} colIndex={colIndex} slideDisc={slideDisc} columnsRef={columnsRef} />
                ))}
            </div>
            {currentGame.alertResult && <ResultMessage type={result.type} text={result.text} />}
        </>
    );
};

export default BoardGrid;
