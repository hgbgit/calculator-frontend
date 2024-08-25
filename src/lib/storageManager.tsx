import { User } from "@/services/types/Calculator";

const STORAGE_KEY = {
  user: "@app:v1:user",
};

class StorageManager {
  private storage?: Storage;

  constructor() {
    if (typeof window !== "undefined") {
      this.storage = window.sessionStorage;
    }
  }

  getUser(): User | null {
    try {
      const user = this.storage?.getItem(STORAGE_KEY.user);
      return JSON.parse(user!) as User;
    } catch (e) {
      return null;
    }
  }

  setUser(user: User) {
    this.storage?.setItem(STORAGE_KEY.user, JSON.stringify(user));
  }

  deleteUser() {
    this.storage?.removeItem(STORAGE_KEY.user);
  }
}

const storageManager = new StorageManager();
export { storageManager };
