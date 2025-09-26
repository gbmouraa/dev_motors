import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  error?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  password?: boolean;
}

export function Input({
  type,
  placeholder,
  label,
  name,
  error,
  register,
  rules,
  password,
}: InputProps) {
  return (
    <div className="flex flex-col mb-4 w-full">
      <label htmlFor={name} className="font-medium text-gray-600 text-sm">
        {label}
      </label>
      <input
        className={`border-2 border-gray-300 rounded-md px-2 py-3 focus:border-blue-500 outline-none text-[15px] font-medium ${
          error && "border-red-500 focus:border-red-500"
        }`}
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
