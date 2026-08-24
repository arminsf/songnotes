import { downloadProject } from "../file/io";
import { useEditorStore } from "../store/editor-store";
import { useProjectStore } from "../store/project-store"

export function Ribbon() {
    const project = useProjectStore((state) => state.project);

    const setEditorOpen = useEditorStore((state) => state.setEditorOpen);
    const setProjectSettingsOpen = useEditorStore((state) => state.setProjectSettingsOpen);

    return (
        <div className="flex flex-col items-start border-b-2 border-stone-400 p-3">
            <h1 
                className="text-2xl size-init font-bold hover:underline cursor-pointer"
                onClick={() => setProjectSettingsOpen(true)}
            >{project.name}</h1>

            <div className="flex flex-row gap-5">
                <div
                    className="text-sky-600 font-mono text-md hover:underline cursor-pointer" 
                    onClick={() => downloadProject(project)}
                >save</div>

                <div
                    className="text-sky-600 font-mono text-md hover:underline cursor-pointer" 
                    onClick={() => setEditorOpen(false)}
                >close</div>
            </div>
        </div>
    )
}