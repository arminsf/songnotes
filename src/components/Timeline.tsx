import { useProjectStore } from "../store/project-store";
import { MeasureGrid } from "./MeasureGrid";
import { SectionBar } from "./SectionBar";

export function Timeline() {
    const width = useProjectStore((state) => state.project.phraseLength)
    const newMeasure = useProjectStore((state) => state.newMeasure)
    const timeline = useProjectStore((state) => state.project.timeline)

    function* constructTimeline() {
        let measuresFirst: number | undefined = undefined;
        let dragging = false;

        for (const [i, timelineObject] of timeline.entries()) {
            if (timelineObject.type === "measure") {
                if (!dragging) {
                    measuresFirst = i;
                    dragging = true;
                }
            } else {
                if (dragging) {
                    yield <MeasureGrid first={measuresFirst} last={i} width={width} />;
                    dragging = false;
                }
            }

            if (timelineObject.type === "section") {
                yield <SectionBar name={timelineObject.name} />;
            }
        }

        if (dragging) {
            yield <MeasureGrid first={measuresFirst} width={width} />;
        }
    }

    return (
        <div className="flex flex-col gap-2">
            {[...constructTimeline()]}

            <div 
                className="border-2 border-stone-400 hover:bg-stone-100 w-full h-10 place-content-center text-center text-stone-400" 
                onClick={() => [0,0,0,0].map(newMeasure)}
            >
            add 4 measures
            </div>
        </div>
    )
}