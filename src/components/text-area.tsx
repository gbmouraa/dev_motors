"use client";

import { Controller } from "react-hook-form";

interface TextAreaProps {
  name: string;
  control: any;
  placeholder: string;
  label: string;
}

export function TextArea({ name, control, placeholder, label }: TextAreaProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col mb-4 w-full">
          <label htmlFor={name} className="font-medium text-gray-600 text-sm">
            {label}
          </label>
          <textarea
            className={`border-2 border-gray-300 rounded-md min-h-20 px-2 py-3 focus:border-black/85 outline-none text-[15px] font-medium ${
              fieldState.error && "border-red-500 focus:border-red-500"
            }`}
            placeholder={placeholder}
            id={name}
            onChange={field.onChange}
            value={field.value}
          />
          {fieldState.error && (
            <p className="text-xs text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    ></Controller>
  );
}
