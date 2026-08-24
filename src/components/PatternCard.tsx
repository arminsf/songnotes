import { useEditorStore } from "../store/editor-store";
import { useProjectStore } from "../store/project-store";

export function PatternCard({ id }: { id: number }) {
    const pattern = useProjectStore((state) => state.project.patterns.find((p) => p.id === id));
    const selectPattern = useEditorStore((state) => state.selectPattern);

    return (pattern ?
        <div 
            className="border p-1 px-3 hover:bg-stone-100"
            onClick={() => selectPattern(id)}
        >
            <div className="flex flex-row gap-3">
            <div className="text-lg flex-1">{pattern.name}</div>
            <div className="text-stone-600 translate-y-0.5">{pattern.label}</div>
            </div>
            <p className="line-clamp-2">{pattern.notes}</p>
        </div>
        : <span>incorrect pattern id</span>
    );
}