import React, { InputHTMLAttributes } from "react";
import "../../global.css";

interface LabeledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  id,
  label,
  error,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-base font-normal font text-white mb-1 font-prompt"
      >
        {label}
      </label>
      <input
        id={id}
        className={` w-full px-3 py-2 bg-white border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
        {...props}
      />
      {error && <p className="mt-1 text-base text-red-600">{error}</p>}
    </div>
  );
};
