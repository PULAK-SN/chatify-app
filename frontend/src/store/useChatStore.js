import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  getAllContacts: async () => {
    try {
      set({ isUserLoading: true });
      const res = await axiosInstance.get("/message/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      console.error("Error in getAllContacts: ", error);
      toast.error(error?.response?.data?.messages);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMyChatPartners: async () => {
    try {
      set({ isUserLoading: true });
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });
    } catch (error) {
      console.error("Error in getChatPartners: ", error);
      toast.error(error?.response?.data?.messages);
    } finally {
      set({ isUserLoading: false });
    }
  },
}));
