import { create } from 'zustand';

type NavigationState = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const useNavigationState = create<NavigationState>((set) => ({
  activeTab: 'users',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));