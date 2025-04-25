import { useState } from "react";

export const useErrorToast = () => {
    const [error, setError] = useState<string | null>(null);

    const showError = (message: string) => {
        setError(message);
    };

    const hideError = () => {
        setError(null);
    };

    return { error, showError, hideError };
};
