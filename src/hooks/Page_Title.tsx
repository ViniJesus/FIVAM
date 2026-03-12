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
          : rawPath;

      const titles: Record<string, string> = {
        "/": "Home",
        "/login": "Login",
        "/register": "Registrar",
        "/postagens": "Postagens",
      };

      const pageTitle = titles[path] ?? "Página";

      document.title = `${pageTitle} | FIVAM`;
    };

    updateTitle();

    const unsubscribe = router.subscribe(updateTitle);

    return unsubscribe;
  }, [router]);

  return null;
}
