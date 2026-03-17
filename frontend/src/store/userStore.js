import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create()(
  persist(
    (set) => ({
      loggedinUser: {},
      setLoggedinUser: (loggedinUser) => {
        set({ loggedinUser })
      },
    }),
    { name: 'user-storage' }
  )
)
