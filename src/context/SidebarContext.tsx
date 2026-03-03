import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextProps {
  collapsed: boolean;
  toggleCollapse: () => void;
  isMobileOpen: boolean;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isModalActive: boolean;
  setModalActive: () => void;
  setModalInactive: () => void;
  isBlurred: boolean;
  setBlurred: (blurred: boolean) => void;
}

// Chaves para localStorage
const SIDEBAR_COLLAPSED_KEY = "sidebar_collapsed";

// Funções auxiliares para localStorage
const getSavedCollapsedState = (): boolean => {
  try {
    const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    return saved !== null ? JSON.parse(saved) : false; // Padrão: expandida
  } catch {
    return false; // Fallback em caso de erro
  }
};

const saveCollapsedState = (collapsed: boolean): void => {
  try {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, JSON.stringify(collapsed));
  } catch {
    // Falha silenciosa se localStorage não estiver disponível
  }
};

const SidebarContext = createContext<SidebarContextProps>({
  collapsed: false,
  toggleCollapse: () => {},
  isMobileOpen: false,
  openMobileSidebar: () => {},
  closeMobileSidebar: () => {},
  isOpen: false,
  setIsOpen: () => {},
  isModalActive: false,
  setModalActive: () => {},
  setModalInactive: () => {},
  isBlurred: false,
  setBlurred: () => {},
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Inicializa com estado salvo no localStorage
  const [collapsed, setCollapsed] = useState(() => getSavedCollapsedState());
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  // Efeito para salvar no localStorage sempre que collapsed mudar
  useEffect(() => {
    saveCollapsedState(collapsed);
  }, [collapsed]);

  const toggleCollapse = () => setCollapsed((prev) => !prev);
  const openMobileSidebar = () => {
    setIsMobileOpen(true);
    setIsOpen(true);
    document.body.classList.add("sidebar-open");
  };
  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
    setIsOpen(false);
    document.body.classList.remove("sidebar-open");
  };

  const setModalActive = () => {
    setIsModalActive(true);
    // Fecha a sidebar mobile se estiver aberta
    if (isMobileOpen) {
      closeMobileSidebar();
    }
  };

  const setModalInactive = () => {
    setIsModalActive(false);
  };

  const setBlurred = (blurred: boolean) => setIsBlurred(blurred);

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        toggleCollapse,
        isMobileOpen,
        openMobileSidebar,
        closeMobileSidebar,
        isOpen,
        setIsOpen,
        isModalActive,
        setModalActive,
        setModalInactive,
        isBlurred,
        setBlurred,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
