import { useEditorStore } from "../../store/editor-store";
import { useProjectStore } from "../../store/project-store"
import { PatternList } from "./PatternList";

export function PatternEditor() {
    const selectedPatternId = useEditorStore((state) => state.selectedPatternId);
    const selectPattern = useEditorStore((state) => state.selectPattern)

    const pattern = useProjectStore((state) => state.project.patterns.find((p) => p.id === selectedPatternId));
    const editPattern = useProjectStore((state) => state.editPattern);

    return pattern ? (
        <div className="relative flex flex-col gap-1 w-full h-full p-3">
            <div 
                className="select-none absolute size-6 hover:bg-stone-200 top-4 right-4 text-center place-content-center"
                onClick={() => selectPattern(null)}
            >×</div>
            <input 
                className="w-60 text-xl p-1" 
                type="text"
                value={pattern.name}
                onChange={(e) => editPattern(pattern.id, {name: e.target.value})} 
            />
            <div className="flex gap-2 items-center flex-wrap">
                <span>Label: </span>
                <input 
                    className="border w-15 p-1" 
                    type="text"
                    value={pattern.label}
                    onChange={(e) => editPattern(pattern.id, {label: e.target.value})} 
                />
                <span>Color: </span>
                <input
                    className="h-full"
                    type="color"
                    value={pattern.color}
                    onChange={(e) => editPattern(pattern.id, {color: e.target.value})}
                />
            </div>
            <textarea 
                className="border resize-none w-full h-full p-2" 
                value={pattern.notes}
                onChange={(e) => editPattern(pattern.id, {notes: e.target.value})} 
            />
        </div>
    ) : (
        <div className="w-full h-full place-content-center text-center">
            <PatternList />
        </div>
    )
}