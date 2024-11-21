import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FooterGame, GridElements, HeaderGame } from "./GameArea";
import { Minimize2 } from "lucide-react";


export default function GameRomArea() {
    const Navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto space-y-6 w-full col-span-2">
            <HeaderGame />
            <GridElements />
            <FooterGame>
                <Button variant="ghost" size="lg" onClick={() => Navigate("/home")}>
                    <Minimize2 />
                    Terminar Jogo
                </Button>
            </FooterGame>
        </div>
    );
}
