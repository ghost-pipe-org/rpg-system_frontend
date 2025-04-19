import { useState, MouseEvent } from "react";
import { FaArrowRight, FaSpinner } from "react-icons/fa";

type ButtonProps = {
  name: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
};

export const Button = ({
  name,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (!onClick || isLoading) return;

    setIsLoading(true);
    try {
      await onClick(event);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonClasses = `px-5 py-2.5 text-sm font-mono font-prompt text-white inline-flex items-center bg-cyan-400 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 disabled:opacity-70 disabled:cursor-not-allowed ${className}`;
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
      aria-busy={isLoading}
      aria-label={isLoading ? "Carregando..." : name}
    >
      {isLoading ? (
        <>
          <FaSpinner className="animate-spin mr-2" aria-hidden="true" />
          Carregando...
        </>
      ) : (
        <>
          {name}
          <FaArrowRight className="ml-2" aria-hidden="true" />
        </>
      )}
    </button>
  );
};