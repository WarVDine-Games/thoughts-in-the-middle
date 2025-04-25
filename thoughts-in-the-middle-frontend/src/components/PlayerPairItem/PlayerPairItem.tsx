import styles from "./PlayerPairItem.module.scss";
import { PlayerPairInfo } from "../../interfaces";
import { useState } from "react";
import { ThoughtTokenContainer } from "../ThoughtTokenContainer/ThoughtTokenContainer";

export interface PlayerPairItemProps {
    playerPairInfo: PlayerPairInfo;
    isActivePair: boolean;
}

export const PlayerPairItem = ({
    playerPairInfo,
    isActivePair,
}: PlayerPairItemProps) => {
    const [shouldShowThoughtTokens, setShouldShowThoughtTokens] =
        useState(false);

    const onHover = () => {
        if (playerPairInfo.thoughtTokens.length === 0) {
            return;
        }
        setShouldShowThoughtTokens(true);
    };

    const onLeave = () => {
        setShouldShowThoughtTokens(false);
    };

    return (
        <div
            className={styles.playerPairHoverContainer}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {shouldShowThoughtTokens && (
                <div className={styles.tooltipContainer}>
                    <ThoughtTokenContainer
                        thoughtTokenStrengths={playerPairInfo.thoughtTokens}
                    />
                </div>
            )}
            <div className={`${styles.playerPairItem} ${isActivePair ? styles.isActivePair : ""}`}>
                <p className={styles.playerPairItemText}>
                    <strong>{playerPairInfo.player1.name}</strong> and{" "}
                    <strong>{playerPairInfo.player2.name}</strong>
                </p>
                <p>
                    <strong>{playerPairInfo.thoughtTokens.length}</strong>{" "}
                    Thought Tokens
                </p>
            </div>
        </div>
    );
};
