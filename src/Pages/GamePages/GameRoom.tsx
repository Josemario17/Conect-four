import Conteiner from "../../Components/Common/Conteiner";
import Title from "../../Components/Common/Title";
import { useParams } from "react-router-dom";
import GameRomArea from "../../Components/Layout/GameRoomArea";
import GameChatMultiplePlayer from "../../Components/Common/ChatMultiplePlayer";


export default function GameRoom() {
    const { room } = useParams()

    return (
        <>
            <div className="mx-auto mb-1">
                <Title>
                    Conect Four -{" "}<div className="max-w-64 truncate">Room: {room}...</div>
                </Title>
                <Conteiner className=" max-w-[1080px] grid grid-cols-3 mt-6 justify-center mx-auto">
                    <GameRomArea />
                    <GameChatMultiplePlayer />
                </Conteiner>
            </div>
        </>
    )
}
