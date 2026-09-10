import { uploadProject } from "./file/io";
import { useEditorStore } from "./store/editor-store";
import { useProjectStore } from "./store/project-store";

function WelcomePageButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <div className="hover:bg-highlight -my-1 py-1 -mx-5 px-5" onClick={onClick}>
      {label}
    </div>
  );
}

export function Welcome() {
  const projectName = useProjectStore((state) => state.project.name);
  const resetProject = useProjectStore((state) => state.resetProject);
  const loadProject = useProjectStore((state) => state.loadProject);

  const projectOpened = useEditorStore((state) => state.projectOpened);
  const setProjectOpened = useEditorStore((state) => state.setProjectOpened);
  const setEditorOpen = useEditorStore((state) => state.setEditorOpen);

  return (
    <div className="grid bg-background size-full items-center justify-items-center text-text">
      <div className="border-2 border-border-weak flex flex-col gap-8 p-5 w-100 ">
        <h1 className="text-3xl">Songnotes</h1>
        <div className="flex flex-col gap-2">
          {projectOpened && (
            <WelcomePageButton
              onClick={() => {
                setEditorOpen(true);
              }}
              label={`Back to ${projectName}`}
            />
          )}

          <WelcomePageButton
            onClick={() => {
              if (projectOpened)
                alert(
                  "the app should ask you if you want to discard your work right now.",
                );

              resetProject();
              setProjectOpened(true);
              setEditorOpen(true);
            }}
            label="New song"
          />

          <WelcomePageButton
            onClick={() => {
              if (projectOpened)
                alert(
                  "the app should ask you if you want to discard your work right now.",
                );

              uploadProject()
                .then((project) => {
                  loadProject(project);
                  setProjectOpened(true);
                  setEditorOpen(true);
                })
                .catch(alert);
            }}
            label="Open song"
          />

          <h3 className="font-mono border-b text-mute">Examples</h3>
        </div>
      </div>
    </div>
  );
}

/*

<WelcomePageButton
            onClick={() => {
              if (projectOpened)
                alert(
                  "the app should ask you if you want to discard your work right now.",
                );

              fetchProject("/songnotes/Song.json").then((project) => {
                loadProject(project);
                setProjectOpened(true);
                setEditorOpen(true);
              });
            }}
            label="Song"
          />

*/
