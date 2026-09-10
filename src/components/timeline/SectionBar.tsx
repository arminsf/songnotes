import { useProjectStore } from "../../store/project-store";

export function SectionBar({ index }: { index: number }) {
  const section = useProjectStore((store) => store.project.timeline[index]);
  const setSectionName = useProjectStore((store) => store.setSectionName);
  const shiftInTimeline = useProjectStore((store) => store.shiftInTimeline);
  const removeFromTimeline = useProjectStore(
    (store) => store.removeFromTimeline,
  );
  if (section.type !== "section") return;

  return (
    <div className="z-30 sticky -top-3 flex flex-row w-full bg-background border-b-2">
      <input
        className="flex-1"
        type="text"
        value={section.name}
        onChange={(e) => setSectionName(index, e.target.value)}
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
