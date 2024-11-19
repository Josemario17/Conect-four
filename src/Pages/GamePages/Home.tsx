import React from "react";
import Conteiner from "../../Components/Common/Conteiner";
import Title from "../../Components/Common/Title";
import GameOptions from "../../Components/Layout/GameOptions";
import GameArea from "../../Components/Layout/GameArea";
import { useGameStore } from "../../GameStore/StepsStore";


export default function HomeGame() {
    const { GameStep } = useGameStore()

    return (
        <>
            <div className="mx-auto">
                <Title>
                    Conect Four
                </Title>
                <Conteiner>
                    {GameStep === "gameOptions" && <GameOptions />}
                    {GameStep === "game" && <GameArea />}
                </Conteiner>
            </div>
        </>
    )
}
