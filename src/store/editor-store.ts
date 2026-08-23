import { create } from "zustand";

interface EditorStore {
    selectedPatternIndex: number | null,

    selectPattern: (pattern: number | null) => void,
}

export const useEditorStore = create<EditorStore>((set) => ({
    selectedPatternIndex: null,
    
    selectPattern: (pattern: number | null) => set({selectedPatternIndex: pattern})
}))
