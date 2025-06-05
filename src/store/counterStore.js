import { create } from 'zustand'

const useCounterStore = create((set) => ({
  count: 0,
  history: [],
  setCount: (number) =>
    set((state) => ({ count: number, history: [...state.history, number] })),
  increase: (value) =>
    set((state) => {
      const newCount = state.count + value;
      return { count: newCount, history: [...state.history, newCount] };
    }),
  reset: () => set({ count: 0, history: [] }),
  clearHistory: () => set((state) => ({ ...state, history: [] })),
}))

export default useCounterStore
