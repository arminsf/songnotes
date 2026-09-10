import { useEffect, useRef } from "react";
import { useProjectStore } from "../../store/project-store";
import { usePlayback } from "../../playback/usePlayback";
import { timelineObjectBeginSecond } from "../../project/timeline";

export function PauseBar({index}: {index: number}) {
    const project = useProjectStore((store) => store.project);
    const pause = useProjectStore((store) => store.project.timeline[index]);
    const setPauseDuration = useProjectStore((store) => store.setPauseDuration);
    const shiftInTimeline = useProjectStore((store) => store.shiftInTimeline);
    const removeFromTimeline = useProjectStore((store) => store.removeFromTimeline);
    if (pause.type !== "pause") return;

    const beginS = timelineObjectBeginSecond(project, index) || 0;

    const progressbarRef = useRef<HTMLDivElement>(null);

    const {getCurrentTime, seek} = usePlayback();

    useEffect(() => {
            let raf: number;
            const tick = () => {
                const w = 100 * Math.min(1, Math.max(0, getCurrentTime() - beginS) / pause.duration);
                if (progressbarRef.current)
                    progressbarRef.current.style.width = `${w}%`;
                raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            return () => cancelAnimationFrame(raf);
        });

    return (
        <div className="relative z-30 flex flex-row w-full border-2">
        <div className="-z-10 absolute bg-text opacity-50 h-full" ref={progressbarRef}></div>
        <span className="cursor-pointer pl-1 text-underline" onClick={() => seek(beginS)}>PAUSE</span>
        <input
            className="w-20 flex-1 ml-5 mr-16 px-1 border-x-1"
            step={0.1}
            type="number"
            value={pause.duration}
            onChange={(e) => setPauseDuration(index, Number(e.target.value))} 
        />

        <div
            className="select-none flex-init w-5 text-center hover:bg-highlight"
            onClick={() => shiftInTimeline(index, -1)}
        >
            🡩
        </div>

        <div
            className="select-none flex-init w-5 text-center hover:bg-highlight"
            onClick={() => shiftInTimeline(index, 1)}
        >
            🡫
        </div>

        <div
            className="select-none flex-init w-5 text-center hover:bg-danger"
            onClick={() => removeFromTimeline(index)}
        >
            ×
        </div>
        </div>
    );
}