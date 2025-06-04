import { useState, MouseEvent } from "react";

type ButtonProps = {
  name: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  variant?: "default" | "red" | "green" | "blackneon";
};

// Classes de variantes do botão
const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-cyan-400 hover:bg-cyan-600 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700",
  red:
    "bg-red-500 hover:bg-red-600 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700",
  green:
    "bg-green-500 hover:bg-green-600 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700",
  blackneon:
    "bg-black hover:bg-gray-800 focus:ring-gray-500 dark:bg-gray-900 dark:hover:bg-gray-800",
};

// Classes base do botão
const BASE_CLASSES = [
  "px-5 py-2.5",
  "text-sm font-prompt text-white",
  "inline-flex items-center justify-center",
  "rounded-lg",
  "focus:ring-1 focus:outline-none",
  "disabled:opacity-70 disabled:cursor-not-allowed",
  "transition-colors"
].join(" ");

// Componente de botão reutilizável com suporte a variantes, loading e acessibilidade.
export const Button = ({
  name,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  isLoading = false,
  variant = "default",
}: ButtonProps) => {
  // Estado interno para loading ao clicar
  const [isInternalLoading, setIsInternalLoading] = useState(false);
  const showLoading = isLoading || isInternalLoading;

  // Handler para clique, suporta funções assíncronas
  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (!onClick || showLoading) return;
    setIsInternalLoading(true);
    try {
      await onClick(event);
    } finally {
      setIsInternalLoading(false);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || showLoading}
      className={[
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        className
      ].join(" ")}
      aria-busy={showLoading}
      aria-label={showLoading ? "Carregando..." : name}
    >
      {showLoading ? (
        // Ícone de loading
        <span className="inline-flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Carregando...
        </span>
      ) : (
        name
      )}
    </button>
  );
};

// Atalhos para botões de variantes específicas
export const DefaultButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="default" />
);

export const RedButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="red" />
);

export const GreenButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="green" />
);

export const BlackNeonButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="blackneon" />
);