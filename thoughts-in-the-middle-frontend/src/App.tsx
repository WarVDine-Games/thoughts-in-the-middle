import { useState } from "react";
import "./App.css";
import { GameInfo, GameOverInfo, LobbyInfo } from "./interfaces";
import { CreateJoinScreen } from "./screens/CreateJoinScreen/CreateJoinScreen";
import { useSocketIo } from "./socket-io/useSocketIo";
import { useUniqueClientId } from "./socket-io/useUniqueClientId";
import { WaitingRoomScreen } from "./screens/WaitingRoomScreen/WaitingRoomScreen";
import { useErrorToast } from "./components/ErrorToast/useErrorToast";
import { ErrorToast } from "./components/ErrorToast/ErrorToast";
import { MainGameScreen } from "./screens/MainGameScreen/MainGameScreen";
import { GameOverScreen } from "./screens/GameOverScreen/GameOverScreen";

function App() {
    const uniqueClientId = useUniqueClientId();
    const errorState = useErrorToast();
    const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
    const [playerCards, setPlayerCards] = useState<string[]>([]);
    const [lobbyInfo, setLobbyInfo] = useState<LobbyInfo | null>(null);
    const [gameOverInfo, setGameOverInfo] = useState<GameOverInfo | null>(null);

    const {
        onCreateRoom,
        onJoinRoom,
        onStartGame,
        onSelectCard,
        onGiveThoughtToken,
    } = useSocketIo({
        socketIoUrl: process.env.BACKEND_URL ?? "http://localhost:2019",
        uniqueClientId,
        updateLobbyInfo: setLobbyInfo,
        showError: errorState.showError,
        updateGameInfo: setGameInfo,
        updatePlayerCards: setPlayerCards,
        updateGameOverInfo: setGameOverInfo,
    });

    return (
        <div>
            {errorState.error && (
                <ErrorToast
                    error={errorState.error}
                    onClose={errorState.hideError}
                />
            )}
            {!lobbyInfo && !gameInfo ? (
                <CreateJoinScreen
                    onCreateRoom={onCreateRoom}
                    onJoinRoom={onJoinRoom}
                />
            ) : lobbyInfo && !gameInfo ? (
                <WaitingRoomScreen
                    onStartGame={onStartGame}
                    lobbyInfo={lobbyInfo}
                    uniqueClientId={uniqueClientId}
                />
            ) : lobbyInfo && gameInfo ? (
                <MainGameScreen
                    lobbyInfo={lobbyInfo}
                    gameInfo={gameInfo}
                    uniqueClientId={uniqueClientId}
                    playerCards={playerCards}
                    selectCard={onSelectCard}
                    onAssignThoughtToken={onGiveThoughtToken}
                />
            ) : null}
            {gameOverInfo && (
                <GameOverScreen
                    gameOverInfo={gameOverInfo}
                    onStartNewGame={onStartGame}
                    gameRoomId={lobbyInfo!.roomId}
                    isAdmin={lobbyInfo!.roomAdminPlayerId === uniqueClientId}
                />
            )}
        </div>
    );
}

export default App;
