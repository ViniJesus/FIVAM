import { useEffect } from "react";

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
          : rawPath; // remove trailing slash
      const pathLower = path.toLowerCase();

      const titles: Record<string, string> = {
        "/login": "Login",
        "/motor_busca": "Motor de Busca",
        "/dashboard": "Dashboard",
        "/resultados": "Resultados",
        "/usuario": "Usuário",
        "/chatbot": "ChatBot",
        "/importa_excel": "Importar Excel",
        "/planos_assinatura": "Planos de Assinatura",
        "/pagamento": "Pagamento",
        "/": "Home",
      };

      if (pathLower.startsWith("/dashboard/data")) {
        document.title = "Gráfico de Dados";
      } else if (pathLower.startsWith("/analise_setor")) {
        document.title = "Análise por Setor";
      } else if (pathLower.startsWith("/grafico")) {
        document.title = "Gráfico";
      } else if (titles[pathLower]) {
        document.title = titles[pathLower];
      } else {
        // Fallback: derive from last segment by replacing underscores with spaces and capitalizing
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

  return null;
}
