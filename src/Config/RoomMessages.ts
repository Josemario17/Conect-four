import { push, ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { database } from "./firebase";
import { getSessionId } from "./SaveLog";

type Room = {
    id: string;
    players: string[];
}

function saveMessage(message: string, player: "player1" | "player2") {
    const data = {message, player, timestamp: Date.now() };
    const db = database;
    const sessionId = getSessionId();
    try {
        const messageRef = push(ref(db, `rooms/${sessionId}`));
        set(messageRef, data);
        return true;
    } catch (error) {
        console.error("Error saving message:", error);
        return false;
    }
}



export { saveMessage, getSessionId };
