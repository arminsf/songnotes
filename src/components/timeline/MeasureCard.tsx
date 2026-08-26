import { useProjectStore } from "../../store/project-store";
import { useEditorStore } from "../../store/editor-store";
import { measureBeginSecond, measureDurationSeconds, rankMeasure } from "../../types/project";
import { useEffect, useRef } from "react";
import { usePlayback } from "../../playback/usePlayback";

export function MeasureCard({index}: {index: number}) {
    const project = useProjectStore((state) => state.project);

    const timelineObject = project.timeline[index];

    const rank = rankMeasure(project.timeline, index);

    const patternId = timelineObject.type === "measure" ? timelineObject.pattern : null;
    const pattern = useProjectStore((state) => state.project.patterns.find((p) => p.id === patternId));

    const newPattern: (clickedMeasureIndex: number | null) => number | null = useProjectStore((state) => state.newPattern);
    const setMeasurePattern: (measureIndex: number, patternId: number | null) => void = useProjectStore((state) => state.setMeasurePattern);

    const selectPattern: (pattern: number | null) => void = useEditorStore((state) => state.selectPattern);
    const selectedPatternId: number | null = useEditorStore((state) => state.selectedPatternId);
    const hoveredPatternId = useEditorStore((state) => state.hoveredPatternId);

    const selectedPattern = useProjectStore((state) => state.project.patterns.find((p) => p.id === selectedPatternId));
    
    const beginS = measureBeginSecond(project, index) || 0;
    const duration = measureDurationSeconds(project, index);

    const progressbarRef = useRef<HTMLDivElement>(null);

    const {getCurrentTime, seek, play} = usePlayback();
    
    useEffect(() => {
        let raf: number;
        const tick = () => {
            const w = 100 * Math.min(1, Math.max(0, getCurrentTime() - beginS) / duration);
            if (progressbarRef.current)
                progressbarRef.current.style.width = `${w}%`;
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    });

    if (project.timeline[index].type !== "measure") return;
    
    return (
        <div 
            className={"flex flex-col "}
            onClick={() => seek(beginS)}
        >
            <div 
                className={"relative select-none flex w-full h-14 text-center border-2" + (pattern ? "" : " border-dotted") + (pattern && hoveredPatternId === patternId ? " bg-stone-100" : "")}
            >
                <span className="z-10 absolute left-1 top-0.5 text-stone-600 text-xs">{rank !== null ? rank + 1 : "???"}</span>
                {pattern ? 
                    (<>
                        <div 
                            className="place-content-center flex-1 hover:bg-stone-100"
                            onClick={() => {return pattern ? selectPattern(pattern.id) : null;}}
                        >{pattern.label}</div>
                        <div 
                            className="hover:bg-stone-100 w-4 flex-initial border-l-2 border-dotted place-content-center"
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
                            className="hover:bg-stone-100 w-4 flex-initial border-l-2 border-dotted place-content-center"
                            onClick={() => selectPattern(newPattern(index))}
                        >+</div>
                    </>)
                }
                
            </div>
            <div className={"h-1 -mb-2 -translate-y-1" + (pattern ? "" : " border-dotted")}>
                <div className="bg-black h-full w-1/4" ref={progressbarRef}>

                </div>
            </div>
        </div>
    )
}