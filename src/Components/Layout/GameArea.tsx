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
                <Conteiner className="w-full grid grid-cols-4 items-center justify-between">
                    <PlayerInfo name={gameOptions?.name || "Jogador 1"} jogadas={players.player1Jogadas} fallback={gameOptions?.name?.[0] || "J"} player="player1" />
                    <PText className="text-4xl text-center text-zinc-50">{players.player1Wins}</PText>
                    <PText className="text-4xl text-center text-zinc-50">{players.player2Wins}</PText>
                    <PlayerInfo name="Jogador 2" jogadas={players.player2Jogadas} fallback="RD" player="player2" />
                </Conteiner>
            </CardContent>
        </Card>
    );
};


const FooterGame = () => {
    const { restartGame, columns } = useGameRunStore();
    const { openModalHistoric, ModalHistoric, closeModalHistoric } = useGameStore();
    const handleRestart = () => restartGame(columns);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Opções do Jogador</CardTitle>
            </CardHeader>
            <CardContent className="space-x-4 flex items-center">
                <Button variant="ghost" size="lg" onClick={handleRestart}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Reiniciar
                </Button>
                <Button variant="ghost" size="lg" className={`${ModalHistoric ? "bg-white text-black" : "bg-transparent"}`} onClick={ModalHistoric ? closeModalHistoric : openModalHistoric}>
                    Histórico de Jogos
                </Button>
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
    const { ModalHistoric } = useGameStore();
    return (
        <div className="max-w-2xl mx-auto space-y-6 w-full">
            <HeaderGame />
            <GridElements />
            <FooterGame />
            {ModalHistoric && <GameHistoric />}
        </div>
    );
}

export { ResultMessage };
