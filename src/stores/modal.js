import { defineStore } from "pinia"

export const modalStore =  defineStore("modal", {
  state: () => ({
    isOpen: false,
  }),
  getters: {
    hiddenClass(state){
      return state.isOpen ? '' : 'hidden'
    },
  },
  actions: {
    toggleModal(){
      this.isOpen = !this.isOpen
    },
  },
})
