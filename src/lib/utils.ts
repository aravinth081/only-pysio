import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names cleanly with Tailwind CSS conflict resolution.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format phone number for tel: links
 */
export function formatPhoneForTel(phone: string): string {
  return phone.replace(/[^+\d]/g, "");
}

/**
 * Format WhatsApp number for click-to-chat links
 */
export function formatWhatsAppUrl(phone: string, message: string = "Hello OnlyPhysio, I'd like to book an appointment."): string {
  const cleanPhone = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
