import { create } from "zustand";

type SidebarId =
  | "styles"
  | "properties"
  | "code"
  | "comments"
  | "attachments"
  | "ai";
interface RightSidebarStoreState {
  open: boolean;
  activeId: SidebarId | null;
  openSidebar: (id: SidebarId) => void;
  closeSidebar: () => void;
  toggleSidebar: (id: SidebarId) => void;
}

export const useRightSidebarStore = create<RightSidebarStoreState>(
  (set, get) => ({
    open: false,
    activeId: null,
    content: null,

    openSidebar: (id) => set({ open: true, activeId: id }),

    closeSidebar: () => set({ open: false }),

    toggleSidebar: (id) => {
      const { open, activeId } = get();
      if (open && activeId === id) {
        set({ open: false });
      } else {
        set({ open: true, activeId: id });
      }
    },
  }),
);
