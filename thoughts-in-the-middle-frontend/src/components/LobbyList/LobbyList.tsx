import styles from "./LobbyList.module.scss";
import { PublicPlayerInfo } from "../../interfaces";

export interface LobbyListProps {
    publicPlayerInfo: PublicPlayerInfo[];
}

export const LobbyList = ({ publicPlayerInfo }: LobbyListProps) => {
    return (
        <div className={styles.lobbyList}>
            <h2>Players</h2>
            <ul className={styles.playerListUl}>
                {publicPlayerInfo.map((player) => (
                    <li key={player.uniqueClientId}>{player.name}</li>
                ))}
            </ul>
        </div>
    );
};
