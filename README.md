# Electric Schema – Workflow Builder demo

A small Vite + React app that uses the [`@workflowbuilder/sdk`](https://www.npmjs.com/package/@workflowbuilder/sdk) made by Synergy Codes. React component to build an **interactive electrical circuit editor** – Battery, Switch, Resistor, Lightbulb, Voltmeter, Ammeter, Wattmeter and an Energy Stats node, with a custom plugin that solves Ohm's law on every diagram change and an LED-vs-incandescent cost comparison on top.

## What's in here

- `src/App.tsx` – mounts `<WorkflowBuilder.Root />` with custom node types, plugins and `localStorage` persistence.
- `src/features/workflowbuilder/nodes/` – one folder per custom node (`schema.ts`, `uischema.ts`, `default-properties-data.ts`, `<name>.ts`).
- `src/features/workflowbuilder/palette.ts` – registers the nodes that appear in the editor's palette.
- `src/features/workflowbuilder/plugins/circuit-solver/` – pure solver that walks the graph from each Battery, applies Ohm's law, and writes results into a Zustand store.
- `src/features/workflowbuilder/plugins/circuit-readouts/` – paints the solver results (voltage, current, power, cost) on each node.

## Run it

```sh
pnpm i
pnpm dev
```

Then open the URL Vite prints. Drag nodes from the left palette onto the canvas, connect them, and the readout plugin will fill in live values as you tweak voltages, resistances and switch states. The diagram is auto-persisted to `localStorage`.

## Stack

- React 19 + TypeScript + Vite
- `@workflowbuilder/sdk` (^2) – the editor component, node schema system and plugin API
- `zustand` – local store for the solver's derived values
