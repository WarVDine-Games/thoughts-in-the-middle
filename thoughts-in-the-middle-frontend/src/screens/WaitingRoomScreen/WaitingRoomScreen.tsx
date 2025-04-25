import styles from "./WaitingRoomScreen.module.scss";
import { Button } from "../../components/Button/Button";
import { LobbyInfo } from "../../interfaces";

export interface WaitingRoomScreenProps {
    lobbyInfo: LobbyInfo;
    uniqueClientId: string;
    onStartGame: (gameRoomId: string) => void;
}

export const WaitingRoomScreen = ({
    lobbyInfo,
    uniqueClientId,
    onStartGame,
}: WaitingRoomScreenProps) => {
    // Show a list of players and a start button if the client id matches the admin player id
    const isAdmin = lobbyInfo.roomAdminPlayerId === uniqueClientId;

    return (
        <div className={styles.waitingRoomScreen}>
            <div className={styles.waitingRoomScreenHeader}>
                <h1>Waiting Room</h1>
            </div>

            <div className={styles.roomInfo}>
                <h2>Room ID: {lobbyInfo.roomId}</h2>
                {isAdmin && (
                    <Button onClick={() => onStartGame(lobbyInfo.roomId)}>
                        Start Game
                    </Button>
                )}
            </div>

            <div className={styles.playerList}>
                <h2>Players</h2>
                <ul className={styles.playerListUl}>
                    {lobbyInfo.lobby.map((player) => (
                        <li key={player.uniqueClientId}>{player.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
