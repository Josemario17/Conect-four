import { push, ref, set } from "firebase/database";
import { database } from "./firebase";
import { getSessionId } from "./SaveLog";


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
