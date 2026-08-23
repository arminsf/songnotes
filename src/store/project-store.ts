import type { Pattern, Project } from "../types/project"; 
import { create } from "zustand";
// import { produce } from "immer";

const initialProject: Project = {
        name: "Untitled",
        bpm: 120,
        key: "C major",
        timeSignNom: 4,
        timeSignDen: 4,
        phraseLength: 4,
        patterns: [
            {
                id: 0,
                name: "Verse Bar",
                label: "V",
                color: "#FF0000",
                notes: "",
            },

            {
                id: 1,
                name: "Chorus Bar",
                label: "C",
                color: "#0000BB",
                notes: "",
            },
        ],
        timeline: [
            {type: "section", name: "verse"},
            {type: "measure", pattern: 0},
            {type: "measure", pattern: 0},
            {type: "measure", pattern: 0},
            {type: "measure", pattern: 0},
            {type: "section", name: "chorus"},
            {type: "measure", pattern: 1},
            {type: "measure", pattern: 1},
            {type: "measure", pattern: 1},
            {type: "measure", pattern: 1},
            {type: "measure", pattern: null},
            {type: "measure", pattern: null},
            {type: "measure", pattern: null},
            {type: "measure", pattern: null},
        ],
}

interface ProjectStore {
    project: Project,
    editPattern: (patternId: number, patch: Partial<Pattern>) => void,
    newPattern: (clickedMeasureIndex: number | null) => number | null,
    newMeasure: () => void,
    setMeasurePattern: (measureIndex: number, patternId: number | null) => void,
}

export const useProjectStore = create<ProjectStore>((set) => ({
    project: initialProject,

    editPattern: (patternId: number, patch: Partial<Pattern>) => set((state) => ({
        project: {
            ...state.project,
            patterns: state.project.patterns.map((p) => p.id === patternId ? {...p, ...patch} : p),
        }
    })),

    newPattern: (clickedMeasureIndex: number | null) => {
        // make new pattern
        // set clicked measure's pattern to new pattern
        let r : number | null = null;
        
        set((state) => {
            let newPatternId = 1 + Math.max(...state.project.patterns.map((p) => p.id));
            r = newPatternId;
            return {
                project: {
                    ...state.project,
                    patterns: [...state.project.patterns, 
                        {
                            id: newPatternId,
                            name: `New Pattern ${newPatternId}`,
                            label: `NP${newPatternId}`,
                            color: "#0000BB",
                            notes: "",
                        }
                    ],

                    timeline: state.project.timeline.map((m, i) => (i === clickedMeasureIndex ? {...m, pattern: newPatternId} : m)),
                }
            }
        });

        return r;
    },

    newMeasure: () => set((state) => ({
        project: {
            ...state.project,
            timeline: [...state.project.timeline, {type: "measure", pattern: null}],
        }
    })),

    setMeasurePattern: (measureIndex: number, patternId: number | null) => set((state) => ({
        project: {
            ...state.project,
            timeline: state.project.timeline.map((m, i) => (i === measureIndex ? {...m, pattern: patternId} : m)),
        }
    })),
}))