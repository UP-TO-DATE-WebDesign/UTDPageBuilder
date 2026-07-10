import type { ReactNode } from "react";
import { create } from "zustand";

interface DialogStoreState {
  open: boolean;
  title: string | null;
  content: ReactNode | null;
  width: string | null;
  openDialog: (content: ReactNode, title?: string, width?: string) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogStoreState>((set) => ({
  open: false,
  title: null,
  content: null,
  width: null,

  openDialog: (content, title, width) =>
    set({ open: true, content, title: title ?? null, width: width ?? null }),

  closeDialog: () => set({ open: false }),
}));
