import * as React from 'react';

// Split contexts for better performance
export const SidebarStateContext = React.createContext<{
  state: 'expanded' | 'collapsed';
  open: boolean;
} | null>(null);

export const SidebarActionsContext = React.createContext<{
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
} | null>(null);

export const SidebarMobileContext = React.createContext<{
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
} | null>(null);

// Custom hooks for each context
export function useSidebarState() {
  const context = React.useContext(SidebarStateContext);
  if (!context) {
    throw new Error('useSidebarState must be used within a SidebarProvider');
  }
  return context;
}

export function useSidebarActions() {
  const context = React.useContext(SidebarActionsContext);
  if (!context) {
    throw new Error('useSidebarActions must be used within a SidebarProvider');
  }
  return context;
}

export function useSidebarMobile() {
  const context = React.useContext(SidebarMobileContext);
  if (!context) {
    throw new Error('useSidebarMobile must be used within a SidebarProvider');
  }
  return context;
}

// Combined hook for all sidebar functionality
export function useSidebar() {
  return {
    ...useSidebarState(),
    ...useSidebarActions(),
    ...useSidebarMobile(),
  };
}
