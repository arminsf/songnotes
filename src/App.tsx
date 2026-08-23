
import { Group, Panel, Separator } from "react-resizable-panels";

import './App.css'

import { MeasureGrid } from "./components/MeasureGrid";
import { PatternEditor } from "./components/PatternEditor";
import { Ribbon } from "./components/Ribbon";

function App() {
  return (
    <div className="w-screen h-screen p-3">
      <Ribbon />
      <Group className="">
        <Panel className="p-3">
          <MeasureGrid />
        </Panel>
        <Separator className="border border-stone-400" />
        <Panel>
          <PatternEditor />
        </Panel>
      </Group>
    </div>
  )
}

export default App
