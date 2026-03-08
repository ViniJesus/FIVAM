import { useEffect } from "react";
import "../../styles/components/Ambiente.css";

const AMBIENTE_LABEL: Record<string, string> = {
  production: "production",
  homologation: "homologation",
  development: "development",
};

function getAmbiente() {
  const raw = (import.meta.env.VITE_AMBIENTE || "development").toLowerCase();

  if (raw === "staging") {
    return "homologation";
  }

  if (raw === "production") {
    return "production";
  }

  return "development";
}

export function Ambiente() {
  const ambienteValue = AMBIENTE_LABEL[getAmbiente()] || "development";

  useEffect(() => {
    document.body.classList.add("has-ambiente-banner");

    return () => {
      document.body.classList.remove("has-ambiente-banner");
    };
  }, []);

  return (
    <header
      className={`ambiente-banner ambiente-banner--${ambienteValue}`}
      role="status"
      aria-live="polite"
    >
      Ambiente: {ambienteValue}
    </header>
  );
}
