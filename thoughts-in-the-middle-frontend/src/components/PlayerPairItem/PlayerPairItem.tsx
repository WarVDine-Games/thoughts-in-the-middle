import styles from "./PlayerPairItem.module.scss";
import { PlayerPairInfo } from "../../interfaces";

export interface PlayerPairItemProps {
    playerPairInfo: PlayerPairInfo;
}

export const PlayerPairItem = ({ playerPairInfo }: PlayerPairItemProps) => {
    return (
        <div className={styles.playerPairItem}>
            <p className={styles.playerPairItemText}>
                <strong>{playerPairInfo.player1.name}</strong> and{" "}
                <strong>{playerPairInfo.player2.name}</strong>
            </p>
            <p>
                Thought Tokens:{" "}
                <strong>{playerPairInfo.thoughtTokens.join(", ")}</strong>
            </p>
        </div>
    );
};
