import { ArrowUpRight, Link} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import * as card from "../ui/card";
import { useNavigate } from "react-router-dom";
import Conteiner from "./Conteiner";
import { PText } from "../Layout/GameOptions";
import { useGameStore } from "../../GameStore/StepsStore";


type CardProps = React.ComponentProps<typeof card.Card>;

export function TokenClipBoardModal({ urlGoto, urlToCopy }: { urlGoto: string, urlToCopy: string }, { className, ...props }: CardProps) {
    const Navigate = useNavigate()
    const { closeModalTokenClipBoard } = useGameStore();

    return (
        <div className="fixed w-screen h-screen top-3 pt-16 right-7">
            <card.Card className={cn("w-[500px] bg-[#1A1831]", className)} {...props}>
                <card.CardHeader>
                    <card.CardTitle>Próximo Jogo</card.CardTitle>
                    <card.CardDescription>Para a Multipartida envie o Link para seu adversário</card.CardDescription>
                </card.CardHeader>
                <card.CardContent className="grid gap-4">
                    <Conteiner className=" flex items-center space-x-4 rounded-md border p-4">
                        <Link />
                        <Conteiner className="flex-1 space-y-1">
                            <PText className="text-sm font-medium leading-none">{urlToCopy}</PText>
                            <PText className="text-sm text-muted-foreground">Copia o link</PText>
                        </Conteiner>
                    </Conteiner>
                </card.CardContent>
                <card.CardFooter>
                    <Button onClick={() => {Navigate(urlGoto); closeModalTokenClipBoard()}} variant={"secondary"} className="w-full mr-2">
                        <ArrowUpRight />Ir para Multipartida
                    </Button>
                </card.CardFooter>
            </card.Card>
        </div>
    );
}
