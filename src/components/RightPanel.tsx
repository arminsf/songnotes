import { useEditorStore } from "../store/editor-store";
import { PatternEditor } from "./patterneditor/PatternEditor";
import { ProjectEditor } from "./ProjectEditor";

export function RightPanel() {
    const projectSettingsOpen = useEditorStore((state) => state.projectSettingsOpen);

    return projectSettingsOpen ? (<ProjectEditor />) : (<PatternEditor />);
}