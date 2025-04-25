import styles from "./ThoughtToken.module.scss";

export interface ThoughtTokenProps {
    thoughtTokenName: string;
}

export const ThoughtToken = ({ thoughtTokenName }: ThoughtTokenProps) => {
    const thoughtTokenToRomanNumeralMap: Record<string, string> = {
        WEAK: "I",
        NORMAL: "II",
        STRONG: "III",
    };

    return (
        <div className={`${styles.thoughtToken} ${styles[thoughtTokenName]}`}>
            <p className={`${styles.thoughtTokenText} ${styles[thoughtTokenName]}`}>
                {thoughtTokenToRomanNumeralMap[thoughtTokenName]}
            </p>
        </div>
    );
};
