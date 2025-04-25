import { Button } from "../Button/Button";
import styles from "./ErrorToast.module.scss";

export interface ErrorToastProps {
    error: string;
    onClose: () => void;
}

export const ErrorToast = ({ error, onClose }: ErrorToastProps) => {
    return (
        <div className={styles.errorToast}>
            <div className={styles.errorToastContent}>
                <p>{error}</p>
            </div>
            <Button onClick={onClose} className={styles.closeButton}>
                Close
            </Button>
        </div>
    );
};
