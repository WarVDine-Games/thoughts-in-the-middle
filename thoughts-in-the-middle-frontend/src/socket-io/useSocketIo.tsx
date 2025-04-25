import { io, Socket } from "socket.io-client";
import { LobbyInfo } from "../interfaces";

export interface UseSocketIoProps {
    socketIoUrl?: string;
    uniqueClientId?: string;
    updateLobbyInfo: (lobbyInfo: LobbyInfo) => void;
    showError: (error: string) => void;
}

export interface UseSocketIoReturn {
    socket: Socket;
    onCreateRoom: (name: string) => void;
    onJoinRoom: (name: string, roomCode: string) => void;
    onStartGame: (gameRoomId: string) => void;
}

export const useSocketIo = ({
    socketIoUrl = "http://localhost:2019",
    uniqueClientId,
    updateLobbyInfo,
    showError,
}: UseSocketIoProps) => {
    const socket = io(socketIoUrl, {
        autoConnect: true,
        transports: ["websocket"],
    });

    socket.on("lobbyInfo", (lobbyInfo) => {
        updateLobbyInfo(lobbyInfo);
    });
    socket.on("error", (error) => {
        showError(error.message ?? error);
    });

    const onCreateRoom = (name: string) => {
        socket.emit("createRoom", { uniqueClientId, name });
    };

    const onJoinRoom = (name: string, roomCode: string) => {
        socket.emit("joinRoom", { uniqueClientId, name, roomCode });
    };

    const onStartGame = (gameRoomId: string) => {
        socket.emit("startGame", { gameRoomId, uniqueClientId });
    };

    return {
        onCreateRoom,
        onJoinRoom,
        onStartGame,
    };
};
