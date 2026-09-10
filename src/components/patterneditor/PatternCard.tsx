import { useEditorStore } from "../../store/editor-store";
import { useProjectStore } from "../../store/project-store";
import { colorToHexCode, contrastWithBackground } from "../../utils";

export function PatternCard({ id }: { id: number }) {
    const pattern = useProjectStore((state) => state.project.patterns.find((p) => p.id === id));
    const selectPattern = useEditorStore((state) => state.selectPattern);
    const hoverPattern = useEditorStore((state) => state.hoverPattern);

    return (pattern ?
        <div 
            className="border border-text p-1 px-3"
            onClick={() => selectPattern(id)}
            onMouseEnter={() => hoverPattern(id)}
            onMouseLeave={() => hoverPattern(null)}
            style={{
                backgroundColor: colorToHexCode(pattern.color),
                color: colorToHexCode(contrastWithBackground(pattern.color))
            }}
        >
            <div className="flex flex-row gap-3">
            <div className="text-lg flex-1">{pattern.name}</div>
            <div className="opacity-70 translate-y-0.5">{pattern.label}</div>
            </div>
            <p className="line-clamp-2">{pattern.notes}</p>
        </div>
        : <span>incorrect pattern id</span>
    );
}