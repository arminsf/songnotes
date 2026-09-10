import { downloadProject } from "../../file/io";
import { useEditorStore } from "../../store/editor-store";
import { useProjectStore } from "../../store/project-store"
import { ThemeButton } from "../ThemeButton";
import { RibbonDJ } from "./RibbonDJ";
import { Tapper } from "./Tapper";

export function Ribbon() {
    const project = useProjectStore((state) => state.project);
    const editProject = useProjectStore((state) => state.editProject);

    const setEditorOpen = useEditorStore((state) => state.setEditorOpen);
    const setProjectSettingsOpen = useEditorStore((state) => state.setProjectSettingsOpen);

    return (
        <div className="flex flex-row gap-3 border-b-2 border-border-weak">
            <div className="flex-init flex flex-col items-start p-3">
                <h1 
                    className="text-2xl h-8 size-init font-bold hover:underline cursor-pointer"
                    onClick={() => setProjectSettingsOpen(true)}
                >{" " + project.name}</h1>

                <div className="flex flex-row gap-5">
                    <div
                        className="text-hyperlink font-mono text-md hover:underline cursor-pointer" 
                        onClick={() => downloadProject(project)}
                    >save</div>

                    <div
                        className="text-hyperlink font-mono text-md hover:underline cursor-pointer" 
                        onClick={() => setEditorOpen(false)}
                    >close</div>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="font-mono p-2 flex flex-row items-start gap-2">
                    <p>BPM:</p>
                    <input 
                        className="w-13 border border-border-weak" 
                        type="number"
                        value={project.bpm}
                        onChange={(e) => editProject({bpm: Number(e.target.value)})}
                        onWheel={(e) => {e.preventDefault(); editProject({bpm: project.bpm - Math.sign(e.deltaY)})}}
                    />
                </div>
                <Tapper />
            </div>
            <RibbonDJ />
            <ThemeButton />
        </div>
    )
}