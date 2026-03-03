import React, { useEffect, useState } from "react";
import { Check, Info, AlertTriangle, X, AlertCircle } from "lucide-react";

export type ToastType = "success" | "info" | "warning" | "error";

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  onClose,
  duration = 5000,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = Math.max(0, (remaining / duration) * 100);

      setProgress(newProgress);

      if (remaining <= 0) {
        clearInterval(interval);
        onClose();
      }
    }, 10); // 100fps para animação mais suave

    return () => clearInterval(interval);
  }, [duration, onClose]);

  const getToastConfig = (type: ToastType) => {
    switch (type) {
      case "success":
        return {
          icon: <Check size={20} className="text-white" />,
          bgColor: "bg-green-500",
          progressColor: "bg-green-600",
          borderColor: "border-green-500",
        };
      case "info":
        return {
          icon: <Info size={20} className="text-white" />,
          bgColor: "bg-blue-500",
          progressColor: "bg-blue-600",
          borderColor: "border-blue-500",
        };
      case "warning":
        return {
          icon: <AlertTriangle size={20} className="text-white" />,
          bgColor: "bg-orange-500",
          progressColor: "bg-orange-600",
          borderColor: "border-orange-500",
        };
      case "error":
        return {
          icon: <AlertCircle size={20} className="text-white" />,
          bgColor: "bg-red-500",
          progressColor: "bg-red-600",
          borderColor: "border-red-500",
        };
    }
  };

  const config = getToastConfig(type);

  return (
    <div className="fixed top-4 right-4 z-50 translate-x-0 transform transition-transform duration-300">
      <div className="max-w-[400px] min-w-[320px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
        <div className="flex items-center p-4">
          {/* Icon */}
          <div
            className={`h-8 w-8 rounded-full ${config.bgColor} mr-3 flex flex-shrink-0 items-center justify-center`}
          >
            {config.icon}
          </div>

          {/* Message */}
          <div className="mr-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-200">
          <div
            className={`h-full ${config.progressColor}`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;
