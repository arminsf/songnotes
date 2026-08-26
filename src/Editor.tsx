
import { Group, Panel, Separator } from "react-resizable-panels";

import { Ribbon } from "./components/ribbon/Ribbon";
import { Timeline } from "./components/timeline/Timeline";
import { RightPanel } from "./components/RightPanel";

export function Editor() {
  return (
    <div className="flex flex-col size-full">
      <Ribbon />
      <Group>
          <Panel className="p-3" defaultSize={350} minSize={350}>
            <Timeline />
          </Panel>
          <Separator className="border border-stone-400" />
          <Panel minSize={350}>
            <RightPanel />
          </Panel>
      </Group>
    </div>
  )
}