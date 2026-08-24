import { create } from "zustand";

interface EditorStore {
    selectedPatternId: number | null,
    hoveredPatternId: number | null,

    selectPattern: (pattern: number | null) => void,
    hoverPattern: (pattern: number | null) => void,
}

export const useEditorStore = create<EditorStore>((set) => ({
    selectedPatternId: null,
    hoveredPatternId: null,
    
    selectPattern: (pattern: number | null) => set({selectedPatternId: pattern}),
    hoverPattern: (pattern: number | null) => set({hoveredPatternId: pattern}),
}))
