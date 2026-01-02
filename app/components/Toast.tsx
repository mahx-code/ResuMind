import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "error" | "success" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "error",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor =
    type === "error"
      ? "bg-badge-red"
      : type === "success"
        ? "bg-badge-green"
        : "bg-badge-yellow";
  const textColor =
    type === "error"
      ? "text-badge-red-text"
      : type === "success"
        ? "text-badge-green-text"
        : "text-badge-yellow-text";
  const icon = type === "error" ? "/icons/cross.svg" : "/icons/info.svg";

  return (
    <div
      className={`fixed bottom-8 right-8 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg border animate-in fade-in slide-in-from-bottom-4 duration-300 ${bgColor} ${textColor} border-black/5 z-50`}
    >
      <img src={icon} alt={type} className="w-5 h-5 opacity-80" />
      <p className="font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-4 p-1 hover:bg-black/5 rounded-full transition-colors"
      >
        <img
          src="/icons/cross.svg"
          alt="close"
          className="w-3 h-3 opacity-50"
        />
      </button>
    </div>
  );
}
