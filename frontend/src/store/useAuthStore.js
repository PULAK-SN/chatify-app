import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in auth check: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signUp", data);
      set({ authUser: res.data });
      // toast notification
      toast.success("Account created successfully");
    } catch (error) {
      console.error("Error in signing up: ", error);
      toast.error(error?.response?.data?.messages);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logIn: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      // toast notification
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error in Logging in: ", error);
      toast.error(error?.response?.data?.messages);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      // toast notification
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error in Logging out: ", error);
      toast.error(error?.response?.data?.messages);
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile update successfully");
    } catch (error) {
      console.error("Error in updating profile: ", error);
      toast.error(error?.response?.data?.messages);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
