import type { NoteName } from "../musictheory/notes";

import { useEditorStore } from "../store/editor-store";
import { useProjectStore } from "../store/project-store";
import { validateProjectName } from "../project/validation";
import { noteName, parseNote } from "../musictheory/notes";

export function ProjectEditor() {
  const project = useProjectStore((state) => state.project);
  const editProject = useProjectStore((state) => state.editProject);

  const setProjectSettingsOpen = useEditorStore(
    (state) => state.setProjectSettingsOpen,
  );

  return (
    <div className="relative flex flex-col gap-1 w-full h-full p-3">
      <div
        className="select-none absolute size-6 hover:bg-highlight top-4 right-4 text-center place-content-center"
        onClick={() => setProjectSettingsOpen(false)}
      >
        ×
      </div>

      <input
        className="w-1/2 text-xl p-1"
        type="text"
        value={project.name}
        placeholder="Song title"
        onChange={(e) => editProject({ name: e.target.value })}
        onBlur={() => {
          editProject({ name: validateProjectName(project.name) });
        }}
      />

      <div className="flex items-center gap-2">
        <span>Time signature: </span>
        <div className="flex flex-col">
          <input
            className="border border-border-weak w-15 p-1"
            type="number"
            value={project.timeSignNom}
            onChange={(e) =>
              editProject({ timeSignNom: parseInt(e.target.value) })
            }
          />
          <input
            className="border-border-weak w-15 p-1"
            type="number"
            disabled={true}
            value={project.timeSignDen}
            onChange={(e) =>
              editProject({ timeSignDen: parseInt(e.target.value) })
            }
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span>Phrase length (in measures): </span>
        <input
          className="border border-border-weak w-15 p-1"
          type="number"
          value={project.phraseLength}
          onChange={(e) =>
            editProject({ phraseLength: parseInt(e.target.value) })
          }
        />
      </div>

      <div className="flex items-center gap-2">
        <span>Key: </span>
        <select
          value={noteName(project.key)}
          onChange={(e) =>
            editProject({ key: parseNote(e.target.value as NoteName) })
          }
        >
          {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
            <>
              <option key={letter + "b"} value={letter + "b"}>
                {letter + "♭"}
              </option>
              <option key={letter} value={letter}>
                {letter}
              </option>
              <option key={letter + "s"} value={letter + "#"}>
                {letter + "♯"}
              </option>
            </>
          ))}
        </select>
      </div>
    </div>
  );
}
