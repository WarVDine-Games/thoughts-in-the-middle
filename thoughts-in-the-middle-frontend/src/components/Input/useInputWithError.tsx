import { useState } from "react";

export interface InputWithErrorProps {
    initialValue?: string;
    placeholder?: string;
}

export interface InputWithErrorReturn {
    value: string;
    onValueChange: (value: string) => void;
    error: string;
    setError: (error: string) => void;
    placeholder: string;
}

export const useInputWithError = ({
    initialValue = "",
    placeholder = "",
}: InputWithErrorProps = {}) => {
    const [value, setValue] = useState<string>(initialValue);
    const [error, setError] = useState<string>("");

    const onValueChange = (value: string) => {
        setValue(value);
        setError(""); // Reset error when value changes
    };

    return { value, onValueChange, error, setError, placeholder };
};
