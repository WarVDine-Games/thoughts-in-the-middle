import styles from "./PlayerPairList.module.scss";
import { PlayerPairInfo } from "../../interfaces";
import { PlayerPairItem } from "../PlayerPairItem/PlayerPairItem";

export interface PlayerPairListProps {
    playerPairInfo: PlayerPairInfo[];
}

export const PlayerPairList = ({ playerPairInfo }: PlayerPairListProps) => {
    return (
        <div className={styles.playerPairList}>
            <h2>Player Pairs</h2>
            <div className={styles.scrollableContainer}>
                <ul className={styles.playerListUl}>
                    {playerPairInfo.map((pair, index) => (
                        <li key={index}>
                            <PlayerPairItem playerPairInfo={pair} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
