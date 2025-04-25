import styles from "./Input.module.scss";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = ({
    value,
    onChange,
    placeholder,
    label,
    error,
}: InputProps) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{label ?? ""}</label>
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${styles.input} ${error ? styles.error : ""}`}
            />
            <p className={styles.errorMessage}>{error ?? ""}</p>
        </div>
    );
};
