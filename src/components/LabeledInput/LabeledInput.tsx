import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import "../../global.css";

//////////////////////////////
// INPUT - MODO CLARO
//////////////////////////////

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
      <label htmlFor={id} className="block text-xs font-normal text-white mb-1 font-prompt">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-3 py-2 bg-white border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

//////////////////////////////
// TEXTAREA - MODO CLARO
//////////////////////////////

interface LabeledTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
}

export const LabeledTextarea: React.FC<LabeledTextareaProps> = ({
  id,
  label,
  error,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-xs font-normal text-white mb-1 font-prompt">
        {label}
      </label>
      <textarea
        id={id}
        className={`w-full px-3 py-2 bg-white border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

//////////////////////////////
// INPUT - MODO ESCURO
//////////////////////////////

interface LabeledInputDarkProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

export const LabeledInputDark: React.FC<LabeledInputDarkProps> = ({
  id,
  label,
  error,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-bold mb-1 text-white">
        {label}
      </label>
      <input
        id={id}
        className={`w-full bg-[#0f0f15] border ${
          error ? "border-red-500" : "border-[#5439E0]"
        } rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5439E0]`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

//////////////////////////////
// TEXTAREA - MODO ESCURO
//////////////////////////////

interface LabeledTextareaDarkProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
}

export const LabeledTextareaDark: React.FC<LabeledTextareaDarkProps> = ({
  id,
  label,
  error,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-bold mb-1 text-white">
        {label}
      </label>
      <textarea
        id={id}
        className={`w-full bg-[#0f0f15] border ${
          error ? "border-red-500" : "border-[#5439E0]"
        } rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5439E0]`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
