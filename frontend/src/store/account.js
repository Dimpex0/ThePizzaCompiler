import { create } from "zustand";

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
};

export const useAccountStore = create((set) => ({
  ...initialState,
  updateIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn: isLoggedIn })), // expects true or false as a value
  updateIsAdmin: (isAdmin) => set(() => ({ isAdmin: isAdmin })), // expects true or false as a value
  reset: () => set(initialState),
}));
