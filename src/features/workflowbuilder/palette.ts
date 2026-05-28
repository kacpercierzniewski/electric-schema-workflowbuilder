import type { PaletteItemOrGroup } from "@workflowbuilder/sdk";

import { ammeter } from "./nodes/ammeter/ammeter";
import { battery } from "./nodes/battery/battery";
import { lightbulb } from "./nodes/lightbulb/lightbulb";
import { resistor } from "./nodes/resistor/resistor";
import { stats } from "./nodes/stats/stats";
import { switchNode } from "./nodes/switch/switch";
import { voltmeter } from "./nodes/voltmeter/voltmeter";
import { wattmeter } from "./nodes/wattmeter/wattmeter";

export const demoPaletteItems: PaletteItemOrGroup[] = [
  battery,
  switchNode,
  resistor,
  lightbulb,
  voltmeter,
  ammeter,
  wattmeter,
  stats,
];
