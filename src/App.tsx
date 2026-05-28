import { WorkflowBuilder } from "@workflowbuilder/sdk";
import "@workflowbuilder/sdk/style.css";
import { demoPaletteItems } from "./features/workflowbuilder/palette";
import { plugin as circuitSolverPlugin } from "./features/workflowbuilder/plugins/circuit-solver/plugin-exports";
import { plugin as circuitReadoutsPlugin } from "./features/workflowbuilder/plugins/circuit-readouts/plugin-exports";
import { diagramTemplates } from "./features/workflowbuilder/templates";

function App() {
  return (
    <WorkflowBuilder.Root
      name="Bulb Comparison"
      layoutDirection="RIGHT"
      nodeTypes={demoPaletteItems}
      diagramTemplates={diagramTemplates}
      integration={{
        strategy: "localStorage",
      }}
      plugins={[circuitSolverPlugin, circuitReadoutsPlugin]}
    />
  );
}

export default App;
