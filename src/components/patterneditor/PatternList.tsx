import { useProjectStore } from "../../store/project-store";
import { PatternCard } from "./PatternCard";

export function PatternList() {
    const patterns = useProjectStore((state) => state.project.patterns);

    return (
        <div className="flex flex-col gap-2 p-3 pt-0 size-full text-left">
            <h1 className="z-10 border-b-1 pt-3 sticky top-0 right-0 bg-white bg-white text-xl">Notes</h1>
            {patterns.map((pattern) => (<PatternCard key={`pattern-card-${pattern.id}`} id={pattern.id} />))}
        </div>
    );
}