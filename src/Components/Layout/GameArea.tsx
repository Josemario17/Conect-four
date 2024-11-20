import { useEffect } from "react";
import { useGameRunStore } from "../../GameStore/GameRunStore";
import { useGameStore } from "../../GameStore/StepsStore";
import Celula from "../Common/Celula";
import Conteiner from "../Common/Conteiner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PText } from "./GameOptions";
import { useGameRuntineStore } from "../../GameStore/GameRuntine";

const PlayerInfo = ({ name, jogadas, fallback }: {
    name: string;
    jogadas: number;
    fallback: string;
}) => (
    <>
        <Conteiner className="flex w-full gap-2 items-center justify-start">
            <Avatar>
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <Conteiner className="w-auto">
                <PText>{name}</PText>
                <PText className="text-xs text-zinc-400">Jogadas: {jogadas}</PText>
            </Conteiner>
        </Conteiner>
    </>
);

const HeaderGame = () => {
    const { gameOptions } = useGameStore();
    const { players } = useGameRunStore();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Dados do Jogo</CardTitle>
            </CardHeader>
            <CardContent>
                <Conteiner className="w-full grid grid-cols-4 items-center justify-between">
                    <PlayerInfo
                        name={gameOptions?.name || "Jogador 1"}
                        jogadas={players.player1Jogadas}
                        fallback={gameOptions?.name?.[0] || "J"}
                    />
                    <PText className="text-4xl text-center text-zinc-50">{players?.player1Wins}</PText>
                    <PText className="text-4xl text-center text-zinc-50">{players?.player2Wins}</PText>
                    <PlayerInfo
                        name="Jogador 2"
                        jogadas={players.player2Jogadas}
                        fallback="RD"
                    />
                </Conteiner>
            </CardContent>
        </Card>
    );
};

const FooterGame = () => {
    const { restartGame, columns } = useGameRunStore();
    const handleRestart = () => {
        restartGame(columns)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Opções do Jogador</CardTitle>
            </CardHeader>
            <CardContent className="space-x-4">
                <Button variant="ghost" size="lg" onClick={handleRestart}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Reiniciar
                </Button>
            </CardContent>
        </Card>
    );
};

const GridElements = () => {
    const { columns, handleButtonClick, currentGame, restartGame, setWins} = useGameRunStore();
    const { checkDraw, checkForWin } = useGameRuntineStore()

    useEffect(() => {
        if (currentGame.AllMoves < 7) return;
        else{
            if (checkForWin(columns, "player1")) {
                restartGame(columns)
                setWins("player1")
                alert("Player 1 ganhou")
            } else if (checkForWin(columns, "player2")) {
                restartGame(columns)
                setWins("player2")
                alert("Player 2 ganhou")
            } else if (checkDraw(columns)) {
                restartGame(columns)
                alert("Empate")
            }
        }
    }, [columns]);

    return (
        <Card>
            <div className="p-6 grid grid-cols-7 gap-4">
                {columns?.map((column, colIndex) => (
                    <button
                        key={colIndex}
                        className="p-2 py-3 space-y-4 rounded-xl grid items-center justify-center hover:bg-zinc-400/20 duration-150"
                        onClick={() => handleButtonClick(colIndex)}
                    >
                        {column.map((state, lineIndex) => (
                            <Celula
                                key={`${colIndex}-${lineIndex}`}
                                selectedState={{ seletion: state === "player1" || state === "player2" ? state : "empty" }}
                            />
                        ))}
                    </button>
                ))}
            </div>
        </Card>
    );
};

export default function GameArea() {
    return (
        <div className="max-w-2xl mx-auto space-y-6 w-full">
            <HeaderGame />
            <GridElements />
            <FooterGame />
        </div>
    );
}
