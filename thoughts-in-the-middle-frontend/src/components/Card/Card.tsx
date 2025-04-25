import styles from "./Card.module.scss";

export interface CardProps {
    wordOnCard: string;
}

export const Card = ({ wordOnCard }: CardProps) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <h2>{wordOnCard}</h2>
            </div>
        </div>
    );
};
