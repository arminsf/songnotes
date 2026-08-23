import { useEditorStore } from "../store/editor-store";
import { useProjectStore } from "../store/project-store"

export function PatternEditor() {
    const selectedPatternIndex = useEditorStore((state) => state.selectedPatternIndex);

    const pattern = useProjectStore((state) => state.project.patterns.find((p) => p.id === selectedPatternIndex));
    const editPattern = useProjectStore((state) => state.editPattern);

    return pattern ? (
        <div className="flex flex-col gap-1 w-full h-full p-3">
            {}
            <input 
                className="w-60 text-xl p-1" 
                type="text"
                value={pattern.name}
                onChange={(e) => editPattern(pattern.id, {name: e.target.value})} 
            />
            <input 
                className="border w-30 p-1" 
                type="text"
                value={pattern.label}
                onChange={(e) => editPattern(pattern.id, {label: e.target.value})} 
            />
            <textarea 
                className="border resize-none w-full h-full p-2" 
                value={pattern.notes}
                onChange={(e) => editPattern(pattern.id, {notes: e.target.value})} 
            />
        </div>
    ) : (
        <div className="w-full h-full place-content-center text-center text-2xl">
            Pattern explorer goes here
        </div>
    )
}