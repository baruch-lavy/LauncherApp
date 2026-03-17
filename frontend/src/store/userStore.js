import { create } from 'zustand'

export const useStore = create((set) => ({
  loggedinUser: {
    username: '',
    role: ''
  },
  setLogeedinUser: (loggedinUser) => set({loggedinUser: loggedinUser })
}))