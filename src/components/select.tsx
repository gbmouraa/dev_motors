"use client";

import { Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";

interface FormSelectProps {
  name: string;
  control: any;
  placeholder: string;
  options: { label: string; value: string }[];
}

export function CategorySelect({
  name,
  control,
  placeholder,
  options,
}: FormSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="w-full">
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              className={`${
                fieldState.error ? "border-red-500" : "border-gray-300"
              } border-2 cursor-pointer bg-white text-black w-full min-h-[49px] hover:bg-gray-100/80 transition-all`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectGroup>
                {options.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="text-gray-500 cursor-pointer hover:bg-gray-300/80 transition-all hover:text-gray-800"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.error && (
            <p className="text-xs text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
