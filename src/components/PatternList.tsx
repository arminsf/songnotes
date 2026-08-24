import { useProjectStore } from "../store/project-store";
import { PatternCard } from "./PatternCard";

export function PatternList() {
    const patterns = useProjectStore((state) => state.project.patterns);

    return (
        <div className="flex flex-col gap-2 p-3 size-full text-left">
            <h1 className="text-xl">Patterns</h1>
            {patterns.map((pattern) => (<PatternCard id={pattern.id} />))}
        </div>
    );
}