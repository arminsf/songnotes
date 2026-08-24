import { useProjectStore } from "../store/project-store";
import { useEditorStore } from "../store/editor-store";

export function MeasureCard({index}: {index: number}) {
    const timeline = useProjectStore((state) => state.project.timeline);

    const timelineObject = timeline[index];
    const patternId = timelineObject.type === "measure" ? timelineObject.pattern : null;
    const pattern = useProjectStore((state) => state.project.patterns.find((p) => p.id === patternId));

    const newPattern: (clickedMeasureIndex: number | null) => number | null = useProjectStore((state) => state.newPattern);
    const setMeasurePattern: (measureIndex: number, patternId: number | null) => void = useProjectStore((state) => state.setMeasurePattern);

    const selectPattern: (pattern: number | null) => void = useEditorStore((state) => state.selectPattern);
    const selectedPatternId: number | null = useEditorStore((state) => state.selectedPatternId);
    const hoveredPatternId = useEditorStore((state) => state.hoveredPatternId);

    const selectedPattern = useProjectStore((state) => state.project.patterns.find((p) => p.id === selectedPatternId));
    
    if (timeline[index].type !== "measure") return;

    return (
        <div 
            className={"relative select-none flex border-2 w-full h-14 text-center" + (pattern ? "" : " border-dotted") + (pattern && hoveredPatternId === patternId ? " bg-stone-100" : "")}
        >
            <span className="absolute left-1 top-0.5 text-stone-600 text-xs">{index}</span>
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
                        onClick={() => {if (selectedPatternId !== null) setMeasurePattern(index, selectedPatternId)}}
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