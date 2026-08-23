import type { Measure, Pattern } from "../types/project";

import { useProjectStore } from "../store/project-store";
import { useEditorStore } from "../store/editor-store";

export function MeasureCard({index}: {index: number}) {
    const timeline: Measure[] = useProjectStore((state) => state.project.timeline);
    const measure: Measure = timeline[index];
    const pattern: Pattern | undefined = useProjectStore((state) => state.project.patterns.find((p) => p.id === measure.pattern));

    const newPattern: (clickedMeasureIndex: number | null) => number | null = useProjectStore((state) => state.newPattern);
    const setMeasurePattern: (measureIndex: number, patternId: number | null) => void = useProjectStore((state) => state.setMeasurePattern);

    const selectPattern: (pattern: number | null) => void = useEditorStore((state) => state.selectPattern);
    const selectedPatternIndex: number | null = useEditorStore((state) => state.selectedPatternIndex);

    const selectedPattern: Pattern | undefined = useProjectStore((state) => state.project.patterns.find((p) => p.id === selectedPatternIndex));


    return (
        <div 
            className={"flex border-2 w-full h-14 text-center" + (pattern ? "" : " border-dotted")}
        >
            {pattern ? 
                (<>
                    <div 
                        className="place-content-center flex-1 hover:bg-stone-100"
                        onClick={() => {return pattern ? selectPattern(pattern.id) : null;}}
                    >{pattern.label}</div>
                    <div 
                        className="hover:bg-stone-100 w-6 flex-initial border-l-2 border-dotted place-content-center"
                        onClick={() => setMeasurePattern(index, null)}
                    >-</div>
                </>)
                :
                // todo: make the hover the color of the pattern about to be made
                (<>
                    <div 
                        className="text-transparent hover:text-black flex-1 hover:bg-stone-100 place-content-center"
                        onClick={() => {if (selectedPatternIndex !== null) setMeasurePattern(index, selectedPatternIndex)}}
                    > 
                        {selectedPattern?.label}
                    </div>
                    <div 
                        className="hover:bg-stone-100 w-6 flex-initial border-l-2 border-dotted place-content-center"
                        onClick={() => selectPattern(newPattern(index))}
                    >+</div>
                </>)
            }
        </div>
    )
}