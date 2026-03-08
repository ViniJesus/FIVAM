import { useEffect } from "react";
import { Ambiente } from "../components/ui/Ambiente";

interface RouterState {
  location: {
    pathname: string;
  };
}

interface Router {
  state: RouterState;
  subscribe: (callback: () => void) => () => void;
}

interface PageTitleProps {
  router: Router;
}

export function Page_Title({ router }: PageTitleProps) {
  useEffect(() => {
    const updateTitle = () => {
      const rawPath = router.state.location.pathname;
      const path =
        rawPath.endsWith("/") && rawPath !== "/"
          ? rawPath.slice(0, -1)
          : rawPath;
      const pathLower = path.toLowerCase();

      const titles: Record<string, string> = {
        "/login": "Login",
        "/motor_busca": "Motor de Busca",
        "/dashboard": "Dashboard",
        "/resultados": "Resultados",
        "/usuario": "Usuario",
        "/chatbot": "ChatBot",
        "/importa_excel": "Importar Excel",
        "/planos_assinatura": "Planos de Assinatura",
        "/pagamento": "Pagamento",
        "/": "Home",
      };

      if (pathLower.startsWith("/dashboard/data")) {
        document.title = "Grafico de Dados";
      } else if (pathLower.startsWith("/posts/")) {
        document.title = "Post";
      } else if (pathLower.startsWith("/analise_setor")) {
        document.title = "Analise por Setor";
      } else if (pathLower.startsWith("/grafico")) {
        document.title = "Grafico";
      } else if (titles[pathLower]) {
        document.title = titles[pathLower];
      } else {
        const segments = pathLower.split("/");
        const last = segments.pop() || "";
        if (last) {
          const formatted = last
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          document.title = formatted;
        }
      }
    };

    updateTitle();

    const unsubscribe = router.subscribe(() => {
      updateTitle();
    });

    return unsubscribe;
  }, [router]);

  return <Ambiente />;
}
