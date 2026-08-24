import { uploadProject } from "./file/io";
import { useEditorStore } from "./store/editor-store";
import { useProjectStore } from "./store/project-store";

export function Welcome() {
    const projectName = useProjectStore((state) => state.project.name);
    const resetProject = useProjectStore((state) => state.resetProject);
    const loadProject = useProjectStore((state) => state.loadProject);

    const projectOpened = useEditorStore((state) => state.projectOpened);
    const setProjectOpened = useEditorStore((state) => state.setProjectOpened);
    const setEditorOpen = useEditorStore((state) => state.setEditorOpen);

    return (
        <div className="grid size-full items-center justify-items-center">
            <div className="border-2 border-stone-200 flex flex-col gap-8 p-5 w-100 ">
                <h1 className="text-3xl">Songnotes</h1>
                <div className="flex flex-col gap-2">
                    { projectOpened ?
                        (<div 
                            className="hover:bg-stone-100 -my-1 py-1 -mx-5 px-5"
                            onClick={() => {setEditorOpen(true);}}
                        >Back to {projectName}</div>)
                        :
                        <></>
                    }

                    <div 
                        className="hover:bg-stone-100 -my-1 py-1 -mx-5 px-5"
                        onClick={() => {
                            if (projectOpened) alert("the app should ask you if you want to discard your work right now.")
                            
                                resetProject(); 
                            setProjectOpened(true); 
                            setEditorOpen(true);
                        }}
                    >New song</div>

                    <div 
                        className="hover:bg-stone-100 -my-1 py-1 -mx-5 px-5"
                        onClick={() => {
                            if (projectOpened) alert("the app should ask you if you want to discard your work right now.")

                            uploadProject()
                            .then((project) => {
                                loadProject(project); 
                                setProjectOpened(true); 
                                setEditorOpen(true);})
                            .catch(alert);
                        }}
                    >Open song</div>
                </div>
                <a className="text-sky-600 font-mono text-md hover:underline cursor-pointer" href="https://github.com/arminsf">github</a>
            </div>
        </div>
    );
}