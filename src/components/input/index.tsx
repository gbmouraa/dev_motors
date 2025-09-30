"use client";

import { useState } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";

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
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    setPasswordType((prev) => (prev === "text" ? "password" : "text"));
  };

  return (
    <div className="flex flex-col mb-4 w-full">
      <label htmlFor={name} className="font-medium text-gray-600 text-sm">
        {label}
      </label>
      <div className="relative w-full">
        <input
          className={`w-full border-2 border-gray-300 rounded-md px-2 py-3 focus:border-blue-500 outline-none text-[15px] font-medium ${
            error && "border-red-500 focus:border-red-500"
          }`}
          type={password ? passwordType : type}
          placeholder={placeholder}
          {...register(name, rules)}
          id={name}
        />
        {password && (
          <button
            type="button"
            className="absolute z-10 right-2 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
            onClick={togglePassword}
          >
            {passwordType === "text" ? (
              <EyeClosed size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
