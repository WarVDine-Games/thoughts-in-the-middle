import styles from "./TableInfo.module.scss";
import { PublicPlayerInfo } from "../../interfaces";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";

export interface TableInfoProps {
    player1: PublicPlayerInfo;
    player2: PublicPlayerInfo;
    player1Card: string;
    player2Card: string;
    isMyTurn: boolean;
    amIAdmin: boolean;
    onAssignThoughtToken: (thoughtToken: number) => void;
    crystalBallStrength: number;
}

export const TableInfo = ({
    player1,
    player2,
    player1Card,
    player2Card,
    isMyTurn,
    amIAdmin,
    onAssignThoughtToken,
    crystalBallStrength,
}: TableInfoProps) => {
    const buildMessage = () => {
        if (isMyTurn) {
            return "Pick a card to play!";
        }
        if (!player1Card) {
            return `Waiting for ${player1.name} to pick a card...`;
        }
        if (player1Card && !player2Card) {
            return `Waiting for ${player2.name} to pick a card...`;
        }
        return `It's time for ${player1.name} and ${player2.name} to find their thought in the middle!`;
    };

    const crystalBallStrengthMessage = () => {
        if (crystalBallStrength === 0) {
            return "The crystal ball is empty.";
        }
        if (crystalBallStrength === 1) {
            return "The crystal ball is weak.";
        }
        if (crystalBallStrength === 2) {
            return "The crystal ball is normal.";
        }
        if (crystalBallStrength === 3) {
            return "The crystal ball is strong.";
        }
    };

    return (
        <div className={styles.tableInfo}>
            <div className={styles.tableCards}>
                {player1Card && <Card wordOnCard={player1Card} />}
                {player2Card && <Card wordOnCard={player2Card} />}
                {amIAdmin && player1Card && player2Card && (
                    <div className={styles.assignThoughtToken}>
                        <Button onClick={() => onAssignThoughtToken(0)}>
                            NONE
                        </Button>
                        <Button onClick={() => onAssignThoughtToken(1)}>
                            WEAK
                        </Button>
                        <Button onClick={() => onAssignThoughtToken(2)}>
                            NORMAL
                        </Button>
                        <Button onClick={() => onAssignThoughtToken(3)}>
                            STRONG
                        </Button>
                    </div>
                )}
            </div>
            <div className={styles.messageContainer}>
                <p>{buildMessage()}</p>
                <p>{crystalBallStrengthMessage()}</p>
            </div>
        </div>
    );
};
