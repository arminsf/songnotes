
import { useProjectStore } from "../store/project-store";

import { MeasureCard } from "./MeasureCard";

export function MeasureGrid({first = undefined, last = undefined, width = 4}: {first?: number, last?: number, width?: number}) {
    const timeline = useProjectStore((state) => state.project.timeline);
    
    

    return (
        <div className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))` }}>
            {timeline.slice(first, last).map((m, i) => m.type === "measure" ? (<MeasureCard key={first?first+i:i} index={first?first+i:i} />) : null)}
        </div>
    )
}