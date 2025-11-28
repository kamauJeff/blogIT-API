import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
}

interface UserStoreType {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

const userStore: StateCreator<UserStoreType> = (set) => {
  return {
    user: null,
    setUser: (user: User) => {
      set({ user });
    },
    removeUser: () => {
      set({ user: null });
    },
  };
};
const useUser = create(persist(userStore, { name: "blogit-user" }));
export default useUser;
