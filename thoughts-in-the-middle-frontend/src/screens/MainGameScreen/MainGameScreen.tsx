import styles from "./MainGameScreen.module.scss";
import { GameInfo, LobbyInfo } from "../../interfaces";
import { useState } from "react";
import { LobbyList } from "../../components/LobbyList/LobbyList";
import { PlayerPairList } from "../../components/PlayerPairList/PlayerPairList";
import { Card } from "../../components/Card/Card";
import { TableInfo } from "../../components/TableInfo/TableInfo";

export interface MainGameScreenProps {
    lobbyInfo: LobbyInfo;
    gameInfo: GameInfo;
    uniqueClientId: string;
    playerCards: string[];
    selectCard: (card: string) => void;
    onAssignThoughtToken: (thoughtToken: number) => void;
}

const isItMyTurn = (gameInfo: GameInfo, uniqueClientId: string) => {
    return (
        (!gameInfo.pairedPlayerCard &&
            gameInfo.pairedPlayerId === uniqueClientId) ||
        (!!gameInfo.pairedPlayerCard &&
            !gameInfo.currentPlayerCard &&
            gameInfo.currentPlayerId === uniqueClientId)
    );
};

export const MainGameScreen = ({
    lobbyInfo,
    gameInfo,
    uniqueClientId,
    playerCards,
    selectCard,
    onAssignThoughtToken,
}: MainGameScreenProps) => {
    const [shouldShowLobby] = useState(false);
    const findPlayerFromLobbyList = (uniqueClientId: string) => {
        return lobbyInfo.lobby.find(
            (player) => player.uniqueClientId === uniqueClientId
        );
    };
    const isMyTurn = isItMyTurn(gameInfo, uniqueClientId);

    const onClickCard = (card: string) => {
        if (isMyTurn) {
            selectCard(card);
        }
    };

    return (
        <div className={styles.mainGameScreen}>
            <div className={styles.lobbyInfo}>
                {shouldShowLobby ? (
                    <LobbyList publicPlayerInfo={lobbyInfo.lobby} />
                ) : (
                    <div className={styles.playPairList}>
                        <PlayerPairList playerPairInfo={gameInfo.playerPairs} />
                    </div>
                )}
            </div>
            <div className={styles.gameInfo}>
                <TableInfo
                    player1={findPlayerFromLobbyList(gameInfo.pairedPlayerId)!}
                    player2={findPlayerFromLobbyList(gameInfo.currentPlayerId)!}
                    player1Card={gameInfo.pairedPlayerCard!}
                    player2Card={gameInfo.currentPlayerCard!}
                    isMyTurn={isMyTurn}
                    amIAdmin={lobbyInfo.roomAdminPlayerId === uniqueClientId}
                    onAssignThoughtToken={onAssignThoughtToken}
                    crystalBallStrength={gameInfo.crystalBallStrength}
                />
            </div>
            <ul className={styles.playerCards}>
                {playerCards.map((card, index) => (
                    <li
                        key={index}
                        className={`${styles.card} ${
                            isMyTurn ? styles.selectable : ""
                        }`}
                        onClick={() => onClickCard(card)}
                    >
                        <Card wordOnCard={card} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
