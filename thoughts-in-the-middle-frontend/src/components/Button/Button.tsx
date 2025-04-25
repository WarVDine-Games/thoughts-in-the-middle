import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

export const Button = ({
    children,
    onClick,
    disabled = false,
    className,
}: ButtonProps) => {
    return (
        <button
            className={`${styles.button} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}