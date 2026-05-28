import type {
  WorkflowBuilderEdge,
  WorkflowBuilderNode,
} from "@workflowbuilder/sdk";

export type NodeComputed = {
  voltage?: number;
  current?: number;
  power?: number;
};

export type SolverResult = {
  perNode: Map<string, NodeComputed>;
  totalCurrent: number;
  totalPower: number;
  totalResistance: number;
  batteryVoltage: number;
  isClosedLoop: boolean;
  isSwitchOpen: boolean;
};

type Props = Record<string, unknown>;

const LOAD_TYPES = new Set(["resistor", "lightbulb"]);
const METER_TYPES = new Set(["voltmeter", "ammeter", "wattmeter"]);

type LoopSummary = {
  totalCurrent: number;
  totalPower: number;
  totalResistance: number;
  batteryVoltage: number;
  isClosedLoop: boolean;
  isSwitchOpen: boolean;
};

const EMPTY_LOOP: LoopSummary = {
  totalCurrent: 0,
  totalPower: 0,
  totalResistance: 0,
  batteryVoltage: 0,
  isClosedLoop: false,
  isSwitchOpen: false,
};

export function solveCircuit({
  nodes,
  edges,
}: {
  nodes: WorkflowBuilderNode[];
  edges: WorkflowBuilderEdge[];
}): SolverResult {
  const perNode = new Map<string, NodeComputed>();
  const byId = new Map(nodes.map((n) => [n.id, n] as const));
  const batteries = nodes.filter((n) => n.data.type === "battery");

  if (batteries.length === 0) {
    return { perNode, ...EMPTY_LOOP };
  }

  const summaries: LoopSummary[] = [];
  for (const battery of batteries) {
    if (perNode.has(battery.id)) continue;
    summaries.push(solveLoop(battery, byId, edges, perNode));
  }

  // Stats nodes that are not on any loop fall through to power = 0.
  for (const node of nodes) {
    if (node.data.type === "stats" && !perNode.has(node.id)) {
      perNode.set(node.id, { power: 0 });
    }
  }

  const first = summaries[0] ?? EMPTY_LOOP;
  return {
    perNode,
    totalCurrent: first.totalCurrent,
    totalPower: summaries.reduce((s, x) => s + x.totalPower, 0),
    totalResistance: first.totalResistance,
    batteryVoltage: first.batteryVoltage,
    isClosedLoop: summaries.some((s) => s.isClosedLoop),
    isSwitchOpen: summaries.some((s) => s.isSwitchOpen),
  };
}

function solveLoop(
  battery: WorkflowBuilderNode,
  byId: Map<string, WorkflowBuilderNode>,
  edges: WorkflowBuilderEdge[],
  perNode: Map<string, NodeComputed>,
): LoopSummary {
  const batteryVoltage = number_((battery.data.properties as Props)?.voltage);

  const loop = walkLoop(battery.id, byId, edges);
  const isClosedLoop = loop.length > 1 && loop.at(-1)?.id === battery.id;

  if (!isClosedLoop) {
    setIfAbsent(perNode, battery.id, {
      voltage: batteryVoltage,
      current: 0,
      power: 0,
    });
    return { ...EMPTY_LOOP, batteryVoltage };
  }

  const orderedLoop = loop.slice(0, -1);

  const isSwitchOpen = orderedLoop.some(
    (n) =>
      n.data.type === "switch" && (n.data.properties as Props)?.isOn === false,
  );

  const totalResistance = orderedLoop.reduce((sum, n) => {
    if (!LOAD_TYPES.has(n.data.type)) return sum;
    return sum + resistanceOf(n.data.type, n.data.properties as Props);
  }, 0);

  const loopCurrent =
    !isSwitchOpen && totalResistance > 0 ? batteryVoltage / totalResistance : 0;
  const loopPower = batteryVoltage * loopCurrent;

  setIfAbsent(perNode, battery.id, {
    voltage: batteryVoltage,
    current: loopCurrent,
    power: loopPower,
  });

  for (let index = 0; index < orderedLoop.length; index++) {
    const node = orderedLoop[index];
    if (node.id === battery.id) continue;
    const type = node.data.type;
    const props = (node.data.properties as Props) ?? {};

    if (LOAD_TYPES.has(type)) {
      const r = resistanceOf(type, props);
      const v = loopCurrent * r;
      setIfAbsent(perNode, node.id, {
        voltage: v,
        current: loopCurrent,
        power: v * loopCurrent,
      });
      continue;
    }

    switch (type) {
      case "switch": {
        setIfAbsent(perNode, node.id, {
          voltage: 0,
          current: loopCurrent,
          power: 0,
        });
        break;
      }
      case "ammeter": {
        setIfAbsent(perNode, node.id, { current: loopCurrent });
        break;
      }
      case "voltmeter":
      case "wattmeter": {
        const upstream = findUpstreamLoad(orderedLoop, index);
        const upstreamResult = upstream ? perNode.get(upstream.id) : undefined;
        setIfAbsent(perNode, node.id, {
          voltage: upstreamResult?.voltage,
          power: upstreamResult?.power,
          current: loopCurrent,
        });
        break;
      }
      case "stats": {
        setIfAbsent(perNode, node.id, { power: loopPower });
        break;
      }
      // No default
    }
  }

  return {
    totalCurrent: loopCurrent,
    totalPower: loopPower,
    totalResistance,
    batteryVoltage,
    isClosedLoop,
    isSwitchOpen,
  };
}

function walkLoop(
  startId: string,
  byId: Map<string, WorkflowBuilderNode>,
  edges: WorkflowBuilderEdge[],
): WorkflowBuilderNode[] {
  const start = byId.get(startId);
  if (!start) return [];

  const path: WorkflowBuilderNode[] = [start];
  const visited = new Set<string>([startId]);
  let cursor = start;

  while (true) {
    const out = edges.find((edge) => edge.source === cursor.id);
    if (!out) return path;
    const next = byId.get(out.target);
    if (!next) return path;
    path.push(next);
    if (next.id === startId) return path;
    if (visited.has(next.id)) return path;
    visited.add(next.id);
    cursor = next;
  }
}

function findUpstreamLoad(
  loop: WorkflowBuilderNode[],
  index: number,
): WorkflowBuilderNode | undefined {
  for (let index_ = index - 1; index_ >= 0; index_--) {
    const n = loop[index_];
    if (!METER_TYPES.has(n.data.type)) return n;
  }
  return undefined;
}

function setIfAbsent(
  map: Map<string, NodeComputed>,
  id: string,
  value: NodeComputed,
) {
  if (!map.has(id)) map.set(id, value);
}

function resistanceOf(type: string, props: Props): number {
  if (type === "resistor") {
    return number_(props.resistance);
  }
  if (type === "lightbulb") {
    const v = number_(props.nominalVoltage);
    const p = number_(props.nominalPower);
    if (v <= 0 || p <= 0) return 0;
    return (v * v) / p;
  }
  return 0;
}

function number_(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}
