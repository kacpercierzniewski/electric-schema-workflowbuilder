import { create } from 'zustand';

import type { SolverResult } from './solver';

type CircuitSolverState = {
  result: SolverResult | null;
  setResult: (result: SolverResult) => void;
};

export const useCircuitSolverStore = create<CircuitSolverState>((set) => ({
  result: null,
  setResult: (result) => set({ result }),
}));
