import { create } from "zustand";

export interface SitePageInfo {
  id: number;
  name: string;
  pageId: string;
}

interface UTDPagesStoreState {
  pages: SitePageInfo[];
  setPages: (pages: SitePageInfo[]) => void;
}

export const useUTDPagesStore = create<UTDPagesStoreState>((set) => ({
  pages: [],
  setPages: (pages) => set({ pages }),
}));
