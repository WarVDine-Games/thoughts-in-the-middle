import { io, Socket } from "socket.io-client";
import { GameInfo, GameOverInfo, LobbyInfo } from "../interfaces";

export interface UseSocketIoProps {
    socketIoUrl?: string;
    uniqueClientId?: string;
    updateLobbyInfo: (lobbyInfo: LobbyInfo | null) => void;
    showError: (error: string) => void;
    updateGameInfo: (gameInfo: GameInfo | null) => void;
    updatePlayerCards: (cards: string[]) => void;
    updateGameOverInfo: (gameOverInfo: GameOverInfo | null) => void;
}

export interface UseSocketIoReturn {
    socket: Socket;
    onCreateRoom: (name: string) => void;
    onJoinRoom: (name: string, roomCode: string) => void;
    onStartGame: (gameRoomId: string) => void;
    onSelectCard: (card: string) => void;
    onGiveThoughtToken: (thoughtTokenStrength: number) => void;
}

export const useSocketIo = ({
    socketIoUrl = "http://localhost:2019",
    uniqueClientId,
    updateLobbyInfo,
    showError,
    updateGameInfo,
    updatePlayerCards,
    updateGameOverInfo,
}: UseSocketIoProps) => {
    const socket = io(socketIoUrl, {
        autoConnect: true,
        transports: ["websocket"],
    });

    socket.on("lobbyInfo", (lobbyInfo: LobbyInfo | null) => {
        updateLobbyInfo(lobbyInfo);
    });
    socket.on("gameInfo", (gameInfo: GameInfo | null) => {
        console.log("gameInfo", gameInfo);
        updateGameInfo(gameInfo);
    });
    socket.on("yourCards", (cards: string[]) => {
        updatePlayerCards(cards);
    });
    socket.on("error", (error) => {
        showError(error.message ?? error);
    });
    socket.on("gameOver", (gameOverInfo: GameOverInfo | null) => {
        updateGameOverInfo(gameOverInfo);
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

    const onSelectCard = (card: string) => {
        socket.emit("selectCard", { uniqueClientId, card });
    };

    const onGiveThoughtToken = (thoughtTokenStrength: number) => {
        socket.emit("giveThoughtToken", {
            uniqueClientId,
            thoughtTokenStrength,
        });
    };

    return {
        onCreateRoom,
        onJoinRoom,
        onStartGame,
        onSelectCard,
        onGiveThoughtToken,
    };
};
