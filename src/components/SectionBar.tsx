import { useProjectStore } from "../store/project-store";

export function SectionBar({index}: {index: number}) {
    const section = useProjectStore((store) => store.project.timeline[index]);
    const setSectionName = useProjectStore((store) => store.setSectionName);
    const removeFromTimeline = useProjectStore((store) => store.removeFromTimeline);
    if (section.type !== "section") return;

    return (
        <div className="sticky -top-3 flex flex-row w-full bg-white border-b-2">
        <input
            className="w-20 flex-1"
            type="text"
            value={section.name}
            onChange={(e) => setSectionName(index, e.target.value)} 
        />
        <div
            className="select-none flex-init w-5 text-center hover:bg-red-200"
            onClick={() => removeFromTimeline(index)}
        >
            ×
        </div>
        </div>
    );
}