
import { Group, Panel, Separator } from "react-resizable-panels";

import './App.css'

import { PatternEditor } from "./components/PatternEditor";
import { Ribbon } from "./components/Ribbon";
import { Timeline } from "./components/Timeline";

function App() {
  return (
    <div className="w-screen h-screen px-20 py-10">
      <Ribbon />
      <Group className="">
        <Panel className="p-3" defaultSize={400} minSize={400}>
          <Timeline />
        </Panel>
        <Separator className="border border-stone-400" />
        <Panel minSize={400}>
          <PatternEditor />
        </Panel>
      </Group>
    </div>
  )
}

export default App
