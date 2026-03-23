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
    const getTitle = (path: string) => {
      // rota dinâmica
      if (path.startsWith("/posts/") && path !== "/posts/create") {
        return "Post Detalhado";
      }

      const titles: Record<string, string> = {
        "/": "Home",
        "/login": "Login",
        "/register": "Registrar",
        "/dashboard": "Postagens",
        "/posts/create": "Criar postagem",
      };

      return titles[path] ?? "Página";
    };

    const updateTitle = () => {
      const rawPath = router.state.location.pathname;

      // remove barra final
      const path =
        rawPath.endsWith("/") && rawPath !== "/"
          ? rawPath.slice(0, -1)
          : rawPath;

      const pageTitle = getTitle(path);

      document.title = `${pageTitle} | FIVAM`;
    };

    updateTitle();

    const unsubscribe = router.subscribe(updateTitle);

    return () => {
      unsubscribe();
    };
  }, [router]);

  return null;
}
