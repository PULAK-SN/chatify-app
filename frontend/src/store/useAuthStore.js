import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "John", _id: 123 },
  isLoading: false,
  logIn: () => {
    console.log("Log in ");
    set({ isLoading: true });
  },
}));
