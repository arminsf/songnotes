import { useProjectStore } from "../store/project-store"

export function InlineBar({timelinePosition}: {timelinePosition: number}) {
    const newSection = useProjectStore((state) => state.newSection);
    
    return (
        <div 
            className="relative w-full h-0 py-3 -my-3 opacity-0 hover:opacity-40 flex"
            onClick={() => newSection(timelinePosition)}    
        >
            <div className="absolute w-full h-px border"></div>
        </div>
    )
}