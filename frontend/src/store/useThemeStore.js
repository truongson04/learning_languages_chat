import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "coffee",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("theme", theme);
  },
}));
export default useThemeStore;
