
import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  maxLength?: number;
  hasGeneralError?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, placeholder, value, onChange, error, maxLength, hasGeneralError }) => {
  const hasError = (error !== null && error !== undefined) || hasGeneralError;
  const labelColor = hasError ? 'text-red-500' : 'text-gray-500';
  const borderColor = hasError ? 'border-red-500' : 'border-gray-300 focus:border-purple-600';

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={`font-bold text-sm uppercase tracking-widest ${labelColor}`}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`w-full p-3 border-2 rounded-lg text-2xl font-bold text-gray-800 transition-colors ${borderColor} focus:outline-none`}
        autoComplete="off"
        inputMode="numeric"
      />
      <div className="h-4">
        {error && <p className="text-red-500 text-xs italic mt-1">{error.trim()}</p>}
      </div>
    </div>
  );
};

export default InputField;
