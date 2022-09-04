import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { Job } from "@/types";

export const useFakeDatabaseStore = defineStore("fakeDatabaseStore", () => {
  const jobArray = useStorage<Job[]>("jobArray", [
    {
      id: 1,
      status: "scheduled",
      dateCreated: "18/11/2021, 4:30 PM",
      name: "Fredrick holmes",
      contactDetails: { email: "fredH@gmail.com", phoneNumber: "0211539845" },
      notes: ["park out back", "beware of dog"],
    },
    {
      id: 2,
      status: "invoicing",
      dateCreated: "26/02/2021, 8:30 AM",
      name: "john doe",
      contactDetails: { email: "johnD@gmail.com", phoneNumber: "0211558265" },
      notes: ["needs job finished before 3pm", "take shoes off on carpet"],
    },
    {
      id: 3,
      status: "complete",
      dateCreated: "3/06/2022, 1:00 PM",
      name: "nathan ellis",
      contactDetails: { email: "nathanE@gmail.com", phoneNumber: "0211591640" },
      notes: ["cant be done on thursday or friday"],
    },
    {
      id: 4,
      status: "complete",
      dateCreated: "3/08/2022, 12:00 PM",
      name: "jason bordeaux",
      contactDetails: { email: "jasonB@gmail.com", phoneNumber: "0211591306" },
      notes: ["only available in afternoon"],
    },
  ]);
  return { jobArray };
});

// import { useFakeDatabaseStore } from '@/fake-database-store'
// import { storeToRefs } from 'pinia'
// const { jobArray } = storeToRefs(useFakeDatabaseStore())
