import { useNodesData } from "@xyflow/react";

import { NodeSection } from "@workflowbuilder/sdk";
import type { WorkflowBuilderNode } from "@workflowbuilder/sdk";

import styles from "./circuit-readout.module.css";

import type { NodeComputed } from "../circuit-solver/solver";
import { useCircuitSolverStore } from "../circuit-solver/use-circuit-solver-store";

type Props = {
  props?: {
    nodeId: string;
  };
};

type CircuitProperties = {
  voltage?: number;
  resistance?: number;
  nominalVoltage?: number;
  nominalPower?: number;
  lumensPerWatt?: number;
  displayValue?: number;
  isOn?: boolean;
  hoursPerDay?: number;
  costPerKwh?: number;
  currency?: string;
};

const CIRCUIT_TYPES = new Set([
  "battery",
  "lightbulb",
  "voltmeter",
  "ammeter",
  "wattmeter",
  "switch",
  "resistor",
  "stats",
]);

function CircuitReadout({ props }: Props) {
  const nodeId = props?.nodeId || "";
  const nodeData = useNodesData<WorkflowBuilderNode>(nodeId);
  const computed = useCircuitSolverStore((s) => s.result?.perNode.get(nodeId));

  if (!nodeData) {
    return null;
  }

  const nodeType = nodeData.data?.type as string | undefined;

  if (!nodeType || !CIRCUIT_TYPES.has(nodeType)) {
    return null;
  }

  const properties =
    (nodeData.data?.properties as CircuitProperties | undefined) ?? {};

  const content = renderForType(nodeType, properties, computed);

  if (!content) {
    return null;
  }

  return (
    <NodeSection label="">
      <div className={styles["container"]}>{content}</div>
    </NodeSection>
  );
}

function renderForType(
  nodeType: string,
  p: CircuitProperties,
  computed: NodeComputed | undefined,
) {
  switch (nodeType) {
    case "battery": {
      return formatValue(p.voltage, "V");
    }
    case "voltmeter": {
      return formatValue(computed?.voltage ?? p.displayValue, "V");
    }
    case "ammeter": {
      return formatValue(computed?.current ?? p.displayValue, "A");
    }
    case "wattmeter": {
      return formatValue(computed?.power, "W");
    }
    case "resistor": {
      return formatValue(p.resistance, "Ω");
    }
    case "lightbulb": {
      return renderLightbulb(p, computed);
    }
    case "switch": {
      return (
        <span
          className={`${styles["value"]} ${p.isOn ? styles["on"] : styles["off"]}`}
        >
          <span className={styles["number"]}>{p.isOn ? "ON" : "OFF"}</span>
        </span>
      );
    }
    case "stats": {
      return renderStats(p, computed);
    }
    default: {
      return null;
    }
  }
}

function formatValue(value: number | undefined, unit: string) {
  return (
    <span className={styles["value"]}>
      <span className={styles["number"]}>{formatNumber(value)}</span>
      <span className={styles["unit"]}>{unit}</span>
    </span>
  );
}

function renderLightbulb(
  p: CircuitProperties,
  computed: NodeComputed | undefined,
) {
  const nominalVoltage = p.nominalVoltage ?? 9;
  const nominalPower = p.nominalPower ?? 1;
  const efficiency = p.lumensPerWatt ?? 15;
  const applied = computed?.voltage ?? 0;
  const power = computed?.power ?? 0;

  const referenceEfficiency = 15;
  const voltageRatio = nominalVoltage > 0 ? applied / nominalVoltage : 0;
  const powerRatio = voltageRatio * voltageRatio;
  const brightness =
    powerRatio * nominalPower * (efficiency / referenceEfficiency);

  const { background, glow } = brightnessToStyle(brightness);

  const resistance =
    nominalPower > 0 ? (nominalVoltage * nominalVoltage) / nominalPower : 0;
  const lumens = power * efficiency;

  return (
    <div className={styles["bulb"]}>
      <div
        className={styles["bulbGlow"]}
        style={{ backgroundColor: background, boxShadow: glow }}
        aria-label={`Lightbulb brightness ${Math.round(brightness * 100)}%`}
      />
      <div className={styles["bulbMeta"]}>
        {formatNumber(nominalPower)} W @ {nominalVoltage} V · {efficiency} lm/W
        <br />
        now: {formatNumber(applied)} V · {formatNumber(power)} W ·{" "}
        {formatNumber(lumens, 1)} lm
        <br />
        <span style={{ opacity: 0.5 }}>
          R = {formatNumber(resistance, 1)} Ω
        </span>
      </div>
    </div>
  );
}

function renderStats(p: CircuitProperties, computed: NodeComputed | undefined) {
  const power = computed?.power ?? 0;
  const hours = p.hoursPerDay ?? 0;
  const cost = p.costPerKwh ?? 0;
  const currency = p.currency?.trim() || "$";

  const dailyKwh = (power * hours) / 1000;
  const monthlyKwh = dailyKwh * 30;
  const yearlyKwh = dailyKwh * 365;
  const dailyCost = dailyKwh * cost;
  const monthlyCost = monthlyKwh * cost;
  const yearlyCost = yearlyKwh * cost;

  return (
    <div className={styles["stats"]}>
      <div className={styles["statsRow"]}>
        <span>Daily</span>
        <span>
          {formatNumber(dailyKwh, 3)} kWh · {formatNumber(dailyCost, 2)}{" "}
          {currency}
        </span>
      </div>
      <div className={styles["statsRow"]}>
        <span>Monthly</span>
        <span>
          {formatNumber(monthlyKwh, 2)} kWh · {formatNumber(monthlyCost, 2)}{" "}
          {currency}
        </span>
      </div>
      <div className={styles["statsRow"]}>
        <span>Yearly</span>
        <span>
          {formatNumber(yearlyKwh, 1)} kWh · {formatNumber(yearlyCost, 2)}{" "}
          {currency}
        </span>
      </div>
    </div>
  );
}

function brightnessToStyle(brightness: number) {
  if (brightness <= 0) {
    return { background: "#2a2a2a", glow: "none" };
  }
  // Human brightness perception is roughly logarithmic in lumens, so the visual
  // mapping is a sigmoid in log10(lumens) space centred at 300 lm (a "small lamp"):
  // ~15 lm reads as practically off, ~100 lm a soft dim glow, ~800 lm clearly bright,
  // and anything past a few thousand lumens saturates without overflowing the node.
  const lumens = brightness * 15;
  const x = 2.5 * Math.log10(Math.max(lumens, 0.001) / 300);
  const visual = 1 / (1 + Math.exp(-x));

  const r = Math.round(45 + (255 - 45) * visual);
  const g = Math.round(35 + (235 - 35) * visual);
  const b = Math.round(8 + (59 - 8) * visual);
  const background = `rgb(${r}, ${g}, ${b})`;

  const glowSpread = 4 + visual * 22;
  const glowAlpha = visual * 0.6;
  const glow = `0 0 ${glowSpread}px ${glowSpread / 2}px rgba(255, 220, 80, ${glowAlpha.toFixed(2)})`;

  return { background, glow };
}

function formatNumber(value: number | undefined, decimals = 2): string {
  if (value === undefined || value === null || Number.isNaN(value)) return "—";
  if (Math.abs(value) < 0.0001) return "0";
  const fixed = value.toFixed(decimals);
  return fixed.replace(/\.?0+$/, "") || "0";
}

export default CircuitReadout;
