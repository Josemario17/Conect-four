import { push, ref, set, update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { database } from "./firebase";

type logData = {
    DataHora: string,
    jogadas: string[][],
    resultado?: string,
}

function getSessionId(): string {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = uuidv4();
        sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
}

function saveLog(logData: logData) {
    const db = database;
    const newId = uuidv4()
    const sessionId = getSessionId();
    const logRef = push(ref(db, `logs/${sessionId}/game-${newId}`));
    set(logRef, logData);
}

export { saveLog }
