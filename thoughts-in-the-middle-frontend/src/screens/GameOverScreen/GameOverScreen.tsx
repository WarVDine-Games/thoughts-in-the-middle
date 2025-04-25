import styles from "./GameOverScreen.module.scss";
import { Button } from "../../components/Button/Button";
import { GameOverInfo } from "../../interfaces";

export interface GameOverScreenProps {
    gameOverInfo: GameOverInfo;
    onStartNewGame: (gameRoomId: string) => void;
    gameRoomId: string;
    isAdmin: boolean;
}

export const GameOverScreen = ({
    gameOverInfo,
    onStartNewGame,
    gameRoomId,
    isAdmin,
}: GameOverScreenProps) => {
    return (
        <div className={styles.gameOverScreen}>
            <h1>Game Over</h1>
            <p>
                {gameOverInfo.winningPair.player1.name} and{" "}
                {gameOverInfo.winningPair.player2.name} won!
            </p>
            <p> Total Score: {gameOverInfo.totalScore}</p>
            {isAdmin && (
                <Button onClick={() => onStartNewGame(gameRoomId)}>
                    Start New Game
                </Button>
            )}
        </div>
    );
};
