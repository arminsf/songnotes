
import type { Measure } from "../types/project";
import { useProjectStore } from "../store/project-store";

import { MeasureCard } from "./MeasureCard";

export function MeasureGrid() {
    const timeline: Measure[] = useProjectStore((state) => state.project.timeline);
    const newMeasure = useProjectStore((state) => state.newMeasure)

    return (<div className="flex flex-col gap-2">
        <div className="grid grid-cols-4 gap-2">
            {timeline.map((_, i) => (<MeasureCard key={i} index={i} />))}
        </div>
        <div className="border-2 border-stone-400 hover:bg-stone-100 w-full h-10 place-content-center text-center text-stone-400" onClick={() => [0,0,0,0].map(newMeasure)}>
            add 4 measures
        </div>
        </div>
    )
}