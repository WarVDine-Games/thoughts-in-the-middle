import { ThoughtToken } from "../ThoughtToken/ThoughtToken";
import styles from "./ThoughtTokenContainer.module.scss";

export interface ThoughtTokenContainerProps {
    thoughtTokenStrengths: string[];
}

export const ThoughtTokenContainer = ({
    thoughtTokenStrengths,
}: ThoughtTokenContainerProps) => {
    return (
        <div className={styles.thoughtTokenContainer}>
            <ul className={styles.thoughtTokenList}>
                {thoughtTokenStrengths.map((strength, index) => (
                    <li key={index} className={styles.thoughtTokenListItem}>
                        <ThoughtToken thoughtTokenName={strength} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
