import { create } from "zustand";

interface EditorStore {
  projectOpened: boolean;
  editorOpen: boolean;
  selectedPatternId: number | null;
  hoveredPatternId: number | null;
  projectSettingsOpen: boolean;

  setProjectOpened: (opened: boolean) => void;
  setEditorOpen: (open: boolean) => void;
  selectPattern: (pattern: number | null) => void;
  hoverPattern: (pattern: number | null) => void;
  setProjectSettingsOpen: (open: boolean) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  projectOpened: false,
  editorOpen: false,
  selectedPatternId: null,
  hoveredPatternId: null,
  projectSettingsOpen: false,

  setProjectOpened: (opened) => set({ projectOpened: opened }),
  setEditorOpen: (open) => set({ editorOpen: open }),
  selectPattern: (pattern) => set({ selectedPatternId: pattern }),
  hoverPattern: (pattern) => set({ hoveredPatternId: pattern }),
  setProjectSettingsOpen: (open) => set({ projectSettingsOpen: open }),
}));
