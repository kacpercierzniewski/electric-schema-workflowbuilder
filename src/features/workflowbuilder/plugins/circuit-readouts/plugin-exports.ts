import {
  type OptionalNodeContent,
  registerComponentDecorator,
} from "@workflowbuilder/sdk";

import CircuitReadout from "./circuit-readout";

type OptionalNodeContentProps = React.ComponentProps<
  typeof OptionalNodeContent
>;

export function plugin(): void {
  registerComponentDecorator<OptionalNodeContentProps>("OptionalNodeContent", {
    content: CircuitReadout,
    name: "CircuitReadout",
  });
}
