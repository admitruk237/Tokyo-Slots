import { create } from 'zustand';

interface IntroStore {
  isIntroVisible: boolean;
  hideIntro: () => void;
}

export const useIntroStore = create<IntroStore>((set) => ({
  isIntroVisible: true,
  hideIntro: () => set({ isIntroVisible: false }),
}));
