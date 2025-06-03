import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import "../../global.css";

interface Option {
  value: string;
  label: string;
}

//////////////////////////////
// INPUT - MODO CLARO
//////////////////////////////

interface LabeledInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id: string;
  label: string;
  error?: string;
  options?: Option[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSelectChange?: React.ChangeEventHandler<HTMLSelectElement>;
}
export const LabeledInput: React.FC<LabeledInputProps> = ({
  id,
  label,
  error,
  options,
  value,
  onChange,
  onSelectChange,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-base font-normal text-white mb-1 font-prompt">
        {label}
      </label>
      {options ? (
        <select
          id={id}
          className={`w-full px-3 py-2 bg-white border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          value={value}
          onChange={onSelectChange}
        >
          <option value="">Selecione...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          className={`w-full px-3 py-2 bg-white border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
      {error && <p className="mt-1 text-base text-red-600">{error}</p>}
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
      <label htmlFor={id} className="block text-base font-normal text-white mb-1 font-prompt">
        {label}
      </label>
      <textarea
        id={id}
        className={`w-full px-3 py-2 bg-white border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black`}
        {...props}
      />
      {error && <p className="mt-1 text-base text-red-600">{error}</p>}
    </div>
  );
};
interface LabeledInputDarkProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id: string;
  label: string;
  error?: string;
  options?: Option[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSelectChange?: React.ChangeEventHandler<HTMLSelectElement>;
}
export const LabeledInputDark: React.FC<LabeledInputDarkProps> = ({
  id,
  label,
  error,
  options,
  value,
  onChange,
  onSelectChange,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-bold mb-1 text-white">
        {label}
      </label>
      {options ? (
        <select
          id={id}
          className={`w-full bg-[#0f0f15] border ${
            error ? "border-red-500" : "border-[#5439E0]"
          } rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5439E0]`}
          value={value}
          onChange={onSelectChange}
        >
          <option value="">Selecione...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          className={`w-full bg-[#0f0f15] border ${
            error ? "border-red-500" : "border-[#5439E0]"
          } rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5439E0]`}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
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