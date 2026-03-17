import { create } from 'zustand'

export const useStore = create((set) => ({
  loggedinUser: {},
  setLoggedinUser: (loggedinUser) => {
    console.log(loggedinUser)
    set({ loggedinUser })
}
}))