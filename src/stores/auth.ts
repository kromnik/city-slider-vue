import { defineStore } from "pinia";
import type { User } from "@/types/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    login(username: string, password: string) {
      // В реальном приложении здесь будет запрос к API
      if (username && password) {
        this.user = { username, password };
        this.isAuthenticated = true;
        return true;
      }
      return false;
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
