import styles from "./PlayerPairList.module.scss";
import { GameInfo, PlayerPairInfo } from "../../interfaces";
import { PlayerPairItem } from "../PlayerPairItem/PlayerPairItem";

export interface PlayerPairListProps {
    playerPairInfo: PlayerPairInfo[];
    gameInfo: GameInfo;
}

export const PlayerPairList = ({
    playerPairInfo,
    gameInfo,
}: PlayerPairListProps) => {
    const isThisTheActivePlayerPair = (playerPairItem: PlayerPairInfo) => {
        return (
            gameInfo.pairedPlayerId === playerPairItem.player2.uniqueClientId &&
            gameInfo.currentPlayerId === playerPairItem.player1.uniqueClientId
        );
    };

    return (
        <div className={styles.playerPairList}>
            <h2>Player Pairs</h2>
            <div className={styles.scrollableContainer}>
                <ul className={styles.playerListUl}>
                    {playerPairInfo.map((pair, index) => (
                        <li key={index}>
                            <PlayerPairItem
                                isActivePair={isThisTheActivePlayerPair(pair)}
                                playerPairInfo={pair}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
