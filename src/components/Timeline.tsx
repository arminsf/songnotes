import { useProjectStore } from "../store/project-store";
import { InlineBar } from "./InlineBar";
import { MeasureRow } from "./MeasureRow";
import { SectionBar } from "./SectionBar";

export function Timeline() {
    const width = useProjectStore((state) => state.project.phraseLength);
    const newMeasure = useProjectStore((state) => state.newMeasure);
    const timeline = useProjectStore((state) => state.project.timeline);

    function* constructTimeline() {
        let firstMeasure: number | undefined = undefined;
        let dragging = false;

        yield <InlineBar timelinePosition={0} />;
        for (const [i, timelineObject] of timeline.entries()) {
            if (dragging && (timelineObject.type !== "measure" || (firstMeasure !== undefined && i === firstMeasure + width))) {
                yield <MeasureRow first={firstMeasure} last={i} width={width} />;
                yield <InlineBar timelinePosition={i} />;
                dragging = false;
            }

            if (timelineObject.type === "measure") {
                if (!dragging) {
                    firstMeasure = i;
                    dragging = true;
                }
            }

            if (timelineObject.type === "section") {
                yield <SectionBar index={i} />;
                yield <InlineBar timelinePosition={i+1} />;
            }
        }

        if (dragging) {
            yield <MeasureRow first={firstMeasure} width={width} />;
            yield <InlineBar timelinePosition={timeline.length} />;
        }
    }

    return (
        <div className="flex flex-col gap-3">
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