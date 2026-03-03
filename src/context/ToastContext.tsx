import type { ToastType } from "@/components/ui/Toast";
import Toast from "@/components/ui/Toast";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const MAX_TOASTS = 3;
const DEBOUNCE_MS = 500;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const lastToastRef = useRef<{ message: string; time: number } | null>(null);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 5000) => {
      const now = Date.now();

      if (
        lastToastRef.current &&
        lastToastRef.current.message === message &&
        now - lastToastRef.current.time < DEBOUNCE_MS
      ) {
        return;
      }

      lastToastRef.current = { message, time: now };

      const id = Math.random().toString(36).substr(2, 9);
      const newToast: ToastMessage = { id, type, message, duration };

      setToasts((prev) => {
        const updated = prev.length >= MAX_TOASTS ? prev.slice(1) : prev;
        return [...updated, newToast];
      });
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="translate-x-0 transform transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Toast
              type={toast.type}
              message={toast.message}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
