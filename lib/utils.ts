import { Serialized } from "@/interface";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function serialize<T>(data: T): Serialized<T> {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}
