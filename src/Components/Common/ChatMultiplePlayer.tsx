import { Send, User, UserMinus } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import * as card from "../ui/card";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Conteiner from "./Conteiner";
import { PText } from "../Layout/GameOptions";
import useSWR from 'swr';
import { saveMessage } from "../../Config/RoomMessages";

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> => fetch(...args).then(res => res.json());

type CardProps = React.ComponentProps<typeof card.Card>;
type MessageProps = { message: string, player: "player1" | "player2", timestamp: number };

const MessageFromCard = ({ message, player }: MessageProps) => (
    <Conteiner className={`flex items-center space-x-4 rounded-md border p-4 ${player === "player2" ? "bg-[#1c475a94]" : "bg-blue-700/5"}`}>
        {player === "player1" ? <User /> : <UserMinus />}
        <Conteiner className="flex-1 space-y-1">
            <PText className="text-sm font-medium leading-none">{player === "player1" ? "Jogador 1" : "Jogador 2"}</PText>
            <PText className="text-sm text-muted-foreground">{message}</PText>
        </Conteiner>
    </Conteiner>
);

const MessageList = ({ messages }: { messages: MessageProps[] }) =>
    !messages.length
        ? <PText className="text-lg w-full h-full flex justify-center items-center">Sem mensagens</PText>
        : messages.map((message, index) => <MessageFromCard key={index} {...message} />);

export default function GameChatMultiplePlayer({ className, ...props }: CardProps) {
    const { room } = useParams<{ room: string }>();
    const player = room?.includes("player2") ? "player2" : "player1";
    const { data, error, isLoading } = useSWR('https://thirdheart-b1751-default-rtdb.firebaseio.com/rooms.json', fetcher);
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const [isSending, setIsSending] = useState<boolean>(false);

    useEffect(() => {
        if (data) {
            const formattedMessages = Object.values(data).flatMap((room: any) =>
                Object.values(room).map((msg: any) => ({
                    message: msg.message,
                    player: msg.player,
                    timestamp: msg.timestamp
                }))
            ).sort((a, b) => a.timestamp - b.timestamp);
            setMessages(formattedMessages);
        }
    }, [data]);

    const handleSendMessage = async () => {
        if (!currentMessage.trim()) return;

        setIsSending(true);
        const timestamp = Date.now();
        const isSaved = await saveMessage(currentMessage, player);
        setIsSending(false);

        if (isSaved) {
            setMessages([...messages, { player, message: currentMessage, timestamp }]);
            setCurrentMessage("");
        }
    };

    return (
        <card.Card className={cn("w-auto mt-3 lg:mt-0 lg:w-[380px] bg-[#1A1831]/70 grid grid-cols-1", className)} {...props}>
            <card.CardHeader>
                <card.CardTitle>Mensagens</card.CardTitle>
                <card.CardDescription>Seus Últimos jogos</card.CardDescription>
            </card.CardHeader>
            <card.CardContent className="row-span-2 min-h-[400px] max-h-[400px] items-start justify-start overflow-scroll space-y-4">
                {isLoading ? <PText>Carregando...</PText> : error ? <PText>Erro ao carregar</PText> : <MessageList messages={messages} />}
            </card.CardContent>
            <card.CardFooter className="h-full grid grid-cols-1 gap-2 items-end max-h-[300px]">
                <Input
                    placeholder="Escreva a sua mensagem"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <Button variant={"secondary"} className="w-full" onClick={handleSendMessage} disabled={isSending}>
                   <Send/> {isSending ? "Carregando..." : "Enviar"}
                </Button>
            </card.CardFooter>
        </card.Card>
    );
}
