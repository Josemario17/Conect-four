import { Dice6, Plus, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import * as card from "../ui/card";
import useSWR from 'swr';
import { useGameStore } from "../../GameStore/StepsStore";

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> => fetch(...args).then(res => res.json());

type LogData = {
    DataHora: string;
    resultado: string;
    jogadas: any[];
};

function transformData(data: Record<string, Record<string, Record<string, LogData>>>) {
    return Object.entries(data).flatMap(([sessionId, games]) =>
        Object.entries(games).flatMap(([gameId, gameInstances]) =>
            Object.values(gameInstances).map(instance => ({
                sessionId,
                gameId,
                DataHora: instance.DataHora,
                resultado: instance.resultado,
                jogadas: instance.jogadas,
            }))
        )
    );
}

const LogLine = ({ gameId, DataHora, resultado }: LogData & { sessionId: string, gameId: string }) => {
    return (
        <div className="mb-4 space-x-3 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <Dice6 color={resultado === "player1" ? "green" : "orange"} />
            <div className="space-y-1">
                <p className={`text-sm font-medium leading-none truncate max-w-[200px] ${resultado === "player1" ? "text-green-600" : "text-orange-400"}`}>
                    Jogo: {gameId}
                </p>
                <LogItem name="Data" value={DataHora} />
                <LogItem name="Resultado" value={resultado} />
            </div>
        </div>
    )
}

const LogItem = ({ name, value }: { name: string, value: string }) => {
    const valueColor = name === "Resultado" && value === "player1" ? 'text-green-500' : name === "Resultado" && value === "player2" ? 'text-orange-400' : "text-white";
    return (
        <p className="text-sm text-muted-foreground">
            {name}: <span className={valueColor}>{value}</span>
        </p>
    );
};


type CardProps = React.ComponentProps<typeof card.Card>;

export function GameHistoric({ className, ...props }: CardProps) {
    const { closeModalHistoric } = useGameStore()
    const { data, error, isLoading } = useSWR('https://thirdheart-b1751-default-rtdb.firebaseio.com/logs.json', fetcher);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    const logs = transformData(data);

    return (
        <div className="fixed min-w-screen min-h-screen top-3 pt-16 right-7">
            <card.Card className={cn("w-[380px] bg-[#1A1831]", className)} {...props}>
                <card.CardHeader>
                    <card.CardTitle>Historico de Jogos</card.CardTitle>
                    <card.CardDescription>Seus Ultimos jogos</card.CardDescription>
                </card.CardHeader>
                <card.CardContent className="grid gap-4">
                    <div>
                        {logs.slice(-4).map((item, index) => (
                            <LogLine key={index} {...item} />
                        ))}
                    </div>
                </card.CardContent>
                <card.CardFooter>
                    <Button onClick={closeModalHistoric} variant={"ghost"} className="w-full mr-2">
                        <X /> Fechar
                    </Button>
                    <Button variant={"secondary"} className="w-full">
                        <Plus /> Ver mais
                    </Button>
                </card.CardFooter>
            </card.Card>
        </div>
    );
}
