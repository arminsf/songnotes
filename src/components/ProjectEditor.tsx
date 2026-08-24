import { useEditorStore } from "../store/editor-store";
import { useProjectStore } from "../store/project-store";
import { validateProjectName } from "../types/project";

export function ProjectEditor() {
    const project = useProjectStore((state) => state.project);
    const editProject = useProjectStore((state) => state.editProject);

    const setProjectSettingsOpen = useEditorStore((state) => state.setProjectSettingsOpen);

    return (
        <div className="relative flex flex-col gap-1 w-full h-full p-3">
            <div 
                className="select-none absolute size-6 hover:bg-stone-200 top-4 right-4 text-center place-content-center"
                onClick={() => setProjectSettingsOpen(false)}
            >×</div>

            <input 
                className="w-1/2 text-xl p-1"
                type="text"
                value={project.name}
                placeholder="Song title"
                onChange={(e) => editProject({name: e.target.value})}
                onBlur={() => {editProject({name: validateProjectName(project.name)});}}
            />
            
            <p>Todo: Tempo, time signature, key, phrase length settings.</p>
        </div>
    );

    // todo: bpm, key, time signature, phraseLength
}