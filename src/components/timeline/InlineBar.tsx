import { PauseCircleIcon } from "@phosphor-icons/react/dist/icons/PauseCircle";
import { useProjectStore } from "../../store/project-store"
import { ClickableIcon } from "../ClickableIcon";

export function InlineBar({timelinePosition}: {timelinePosition: number}) {
    const newSection = useProjectStore((state) => state.newSection);
    const newPause = useProjectStore((state) => state.newPause);
    
    return (
        <div className="select-none flex opacity-0 hover:opacity-100 gap-2 py-2 -my-2">
            <div 
                className="cursor-pointer z-0 w-full h-0 py-2 -my-2 opacity-40 hover:opacity-100 hover:opacity-40"
                onClick={() => newSection(timelinePosition)}
            >
                <div className="w-full h-px border-b-2 border-dotted"></div>
            </div>
            <div 
                className="cursor-pointer h-0 py-2 -my-2 -translate-y-2 text-sm opacity-40 hover:opacity-100"
                onClick={() => newPause(timelinePosition)}
            >
                <ClickableIcon Icon={PauseCircleIcon} size={18} />
            </div>
        </div>
    )
}