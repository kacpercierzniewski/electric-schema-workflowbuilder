import { registerComponentDecorator } from "@workflowbuilder/sdk";

import { CircuitSolverRunner } from "./circuit-solver-runner";

export function plugin(): void {
  registerComponentDecorator("OptionalHooks", {
    content: CircuitSolverRunner,
    name: "CircuitSolver",
  });
}
