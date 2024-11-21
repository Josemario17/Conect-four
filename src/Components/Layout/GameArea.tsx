import { useGameRunStore } from "../../GameStore/GameRunStore";
import { useGameStore } from "../../GameStore/StepsStore";
import Conteiner from "../Common/Conteiner";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PText } from "./GameOptions";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import BoardGrid from "../Common/GridElements";
import { GameHistoric } from "../Common/HistoricModal";
import { Minimize2, RefreshCcw } from "lucide-react";

const getPlayerColor = (currentTurn: string, player: string) =>
    player === currentTurn ? (player === "player1" ? "border-green-600" : "border-orange-600") : "border-transparent";

const ResultMessage = ({ type, text }: { type: "win" | "draw", text: string[] }) => {
    const { setAlertResult, currentGame } = useGameRunStore();
    return (
        <AlertDialog open={currentGame.alertResult}>
            <AlertDialogContent className={type === "win" ? "border-green-600" : "border-zinc-500"}>
                <AlertDialogHeader>
                    <AlertDialogTitle className={type === "win" ? "text-green-600" : "text-zinc-500"}>{text[0]}</AlertDialogTitle>
                    <AlertDialogDescription className="text-white">{text[1]}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setAlertResult(false)} className={type === "win" ? "bg-green-600" : "bg-zinc-500"}>
                        Sim, novo jogo!
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

const PlayerInfo = ({ name, jogadas, fallback, player }: { name: string, jogadas: number, fallback: string, player: "player1" | "player2" }) => {
    const { currentGame } = useGameRunStore();
    const playerColor = getPlayerColor(currentGame.playerTurn, player);
    return (
        <Conteiner className="flex w-full gap-2 items-center justify-start">
            <Avatar>
                <AvatarFallback className={`border-2 ${playerColor}`}>{fallback}</AvatarFallback>
            </Avatar>
            <Conteiner className="w-auto">
                <PText>{name}</PText>
                <PText className="text-xs text-zinc-400">Jogadas: {jogadas}</PText>
            </Conteiner>
        </Conteiner>
    );
};


const HeaderGame = () => {
    const { gameOptions } = useGameStore();
    const { players } = useGameRunStore();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Dados do Jogo</CardTitle>
            </CardHeader>
            <CardContent>
                <Conteiner className="w-full grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 items-center justify-center md:justify-start lg:justify-between">
                    <PlayerInfo name={gameOptions?.name || "Jogador 1"} jogadas={players.player1Jogadas} fallback={gameOptions?.name?.[0] || "J"} player="player1" />
                    <PText className="text-4xl text-center text-zinc-50">{players.player1Wins}</PText>
                    <PText className="text-4xl text-center text-zinc-50">{players.player2Wins}</PText>
                    <PlayerInfo name="Jogador 2" jogadas={players.player2Jogadas} fallback="RD" player="player2" />
                </Conteiner>
            </CardContent>
        </Card>
    );
};


const FooterGame = ({ children }: { children: React.ReactNode }) => {
    const { restartGame, columns } = useGameRunStore();
    const handleRestart = () => restartGame(columns);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Opções do Jogador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 lg:space-y-0 lg:space-x-4 grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
                <Button variant="ghost" size="lg" onClick={handleRestart}>
                    <RefreshCcw />
                    Reiniciar
                </Button>
                {children}
            </CardContent>
        </Card>
    );
};


const GridElements = () => (
    <Card>
        <BoardGrid />
    </Card>
);


export default function GameArea() {
    const { openModalHistoric, ModalHistoric, closeModalHistoric } = useGameStore();
    return (
        <div className="max-w-2xl mx-auto space-y-6 w-full">
            <HeaderGame />
            <GridElements />
            <FooterGame>
                <Button variant="ghost" size="lg" className={`${ModalHistoric ? "bg-white text-black" : "bg-transparent"}`} onClick={ModalHistoric ? closeModalHistoric : openModalHistoric}>
                    <Minimize2 />
                    Historico de Jogos
                </Button>
            </FooterGame>
            {ModalHistoric && <GameHistoric />}
        </div>
    );
}

export { ResultMessage, FooterGame, HeaderGame, GridElements };
