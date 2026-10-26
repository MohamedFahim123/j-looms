import axios from "axios";
import { toast } from "react-toastify";
<<<<<<< HEAD
import { create } from "zustand";
import { getTokenFromServerCookies } from "../auth/utils/storeTokenOnServer";
import { baseUrl } from "../utils/baseUrl";
=======
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

interface Class {
  id: number;
  name: string;
}

export interface UseClassesStoreIterface {
  classes: Class[];
  classesError: unknown;
  classesLoading: boolean;
  getClasses: () => Promise<void>;
}
<<<<<<< HEAD

let lastFetchedTime = 0;
const CACHE_EXPIRATION_TIME = 10 * 60 * 1000;
=======
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

export const useClassesStore = create<UseClassesStoreIterface>((set) => ({
  classes: [],
  classesError: null,
  classesLoading: false,
  getClasses: async () => {
<<<<<<< HEAD
    const token = await getTokenFromServerCookies();
    const currentTime = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ classesLoading: true });

    try {
=======
    const currentTime = new Date().getTime();
    set({ classesLoading: true });

    try {
      const token = Cookies.get("SERVER_JLOOMS_TOKEN");
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
      const res = await axios.get(
        `${baseUrl}/school/get-all-classes?t=${currentTime}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
<<<<<<< HEAD
        }
      );

      const classes = res?.data?.data?.classes || [];
      lastFetchedTime = currentTime;
=======
        },
      );

      const classes = res?.data?.data?.classes || [];
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

      set({
        classes,
        classesError: null,
        classesLoading: false,
      });
    } catch (err) {
      set({
        classes: [],
        classesError: axios.isAxiosError(err)
          ? err.response?.data?.message || "Error fetching classes"
          : "Unexpected error occurred!",
        classesLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
