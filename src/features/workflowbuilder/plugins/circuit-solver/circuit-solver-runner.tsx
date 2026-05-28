import { useEffect } from "react";

import { useStore } from "@workflowbuilder/sdk";

import { solveCircuit } from "./solver";
import { useCircuitSolverStore } from "./use-circuit-solver-store";

export function CircuitSolverRunner() {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  const setResult = useCircuitSolverStore((s) => s.setResult);

  useEffect(() => {
    const result = solveCircuit({ nodes, edges });
    setResult(result);
  }, [nodes, edges, setResult]);

  return null;
}
