import { defineStore } from "pinia";

const useStore = defineStore("storeId", {
  state: () => ({
    temperatures: [],
    monthlyPower: [],
    yawAngle: [],
    totalData: {},
    activeData: [],
    errorData: [],
  }),
  actions: {
    increment() {
      //   this.counter++
    },
  },
});
