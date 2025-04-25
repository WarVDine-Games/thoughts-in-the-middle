import styles from "./Card.module.scss";

export interface CardProps {
    wordOnCard: string;
    isHoverAllowed?: boolean;
}

export const Card = ({ wordOnCard, isHoverAllowed = true }: CardProps) => {
    return (
        <div className={`${styles.cardContainer} ${isHoverAllowed ? styles.hoverable : ""}`}>
            <div className={`${styles.card} ${isHoverAllowed ? styles.hoverable : ""}`}>
                <h2>{wordOnCard}</h2>
            </div>
        </div>
    );
};
