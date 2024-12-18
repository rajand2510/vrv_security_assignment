import { create } from 'zustand';

type NavigationState = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const useNavigationState = create<NavigationState>((set) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));