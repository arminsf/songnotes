import { useEffect, useRef, useState } from "react";
import { uploadProject } from "./file/io";
import { useEditorStore } from "./store/editor-store";
import { useProjectStore } from "./store/project-store";
import { ThemeButton } from "./components/ThemeButton";

function WelcomePageButton({
  label,
  action,
  askConfirm,
  confirmMessage = "",
}: {
  label: string;
  action: () => void;
  askConfirm: boolean
  confirmMessage?: string;
}) {
  const [confirm, setConfirm] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (confirm) {
      document.addEventListener("pointerup", (e) => {
        if (!buttonRef.current || !buttonRef.current.contains(e.target as Node))
          setConfirm(false);
      })
    }
  });

  return (
    <div className={"select-none flex -my-1 -mx-5" + (confirm ? " bg-highlight" : "")} ref={buttonRef}>
      <span className="flex-1 px-5 py-1 hover:bg-highlight"
        onClick={askConfirm ? (confirm ? undefined : (askConfirm ? () => setConfirm(true) : action)) : action}
      >{confirm ? confirmMessage : label}</span>
      {confirm && <>
        <div className="hover:bg-danger px-2 py-1" onClick={action}>
          Proceed
        </div>
        <div className="hover:bg-pressed px-2 py-1" onClick={() => setConfirm(false)}>
          Do not
        </div>
      </>}
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
    <div className="grid size-full items-center justify-items-center text-text">
      <div className="border-2 border-border-weak flex flex-col gap-8 p-5 w-100 ">
        <div className="flex">
          <h1 className="text-3xl flex-1">Songnotes</h1>
          <ThemeButton />
        </div>

        <div className="flex flex-col gap-2">
          {projectOpened && (
            <WelcomePageButton
              action={() => {
                setEditorOpen(true);
              }}
              label={`Back to ${projectName}`}
              askConfirm={false}
            />
          )}

          <WelcomePageButton
            action={() => {
              resetProject();
              setProjectOpened(true);
              setEditorOpen(true);
            }}
            label="New song"
            askConfirm={projectOpened}
            confirmMessage="Discard changes?"
          />

          <WelcomePageButton
            action={() => {
              uploadProject()
                .then((project) => {
                  loadProject(project);
                  setProjectOpened(true);
                  setEditorOpen(true);
                })
                .catch(alert);
            }}
            label="Open song"
            askConfirm={projectOpened}
            confirmMessage="Discard changes?"
          />

          <h3 className="font-mono border-b text-mute">Examples</h3>
        </div>
        <span className="text-s font-mono">Icons from <a className="text-hyperlink" href="https://phosphoricons.com/">Phosphor</a></span>
      </div>
    </div>
  );
}

/*

<WelcomePageButton
            onClick={() => {
              fetchProject("/songnotes/Song.json").then((project) => {
                loadProject(project);
                setProjectOpened(true);
                setEditorOpen(true);
              });
            }}
            label="Song"
            askConfirm={projectOpened}
            confirmMessage="Discard changes?"
          />

*/
