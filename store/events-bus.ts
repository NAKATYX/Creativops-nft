import { create } from "zustand";

type EventBusState = {
  isDirty: boolean;
  markBalanceDirty: () => void;
  markBalanceClean: () => void;
};

export const useEventBus = create<EventBusState>((set) => ({
  isDirty: false,
  markBalanceDirty: () => set({ isDirty: true }),
  markBalanceClean: () => set({ isDirty: false }),
}));
