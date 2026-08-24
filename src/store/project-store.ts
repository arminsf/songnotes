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
                name: "Pattern 0",
                label: "P",
                color: "#FF0000",
                notes: "",
            },
        ],
        timeline: [
            {type: "section", name: "verse"},
            {type: "measure", pattern: 0},
            {type: "measure", pattern: 0},
            {type: "measure", pattern: 0},
            {type: "measure", pattern: 0},
        ],
}

interface ProjectStore {
    project: Project,
    resetProject: () => void,
    loadProject: (project: Project) => void,
    editProject: (patch: Partial<Omit<Project, 'patterns' | 'timeline'>>) => void,

    editPattern: (patternId: number, patch: Partial<Pattern>) => void,
    removeFromTimeline: (index: number) => void,
    newPattern: (clickedMeasureIndex: number | null) => number | null,
    newMeasure: () => void,
    setMeasurePattern: (measureIndex: number, patternId: number | null) => void,
    newSection: (at: number) => void,
    setSectionName: (sectionIndex: number, name: string) => void,
}

export const useProjectStore = create<ProjectStore>((set) => ({
    project: initialProject,

    resetProject: () => set({project: initialProject}),

    loadProject: (project) => set({project: project}),

    editProject: (patch) => set((state) => ({
        project: {
            ...state.project,
            ...patch,
        }
    })),

    editPattern: (patternId, patch) => set((state) => ({
        project: {
            ...state.project,
            patterns: state.project.patterns.map((p) => p.id === patternId ? {...p, ...patch} : p),
        }
    })),

    removeFromTimeline: (index) => set((state) => ({
        project: {
            ...state.project,
            timeline: state.project.timeline.filter((_, i) => i !== index),
        }
    })),

    newPattern: (clickedMeasureIndex) => {
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

    setMeasurePattern: (measureIndex, patternId) => set((state) => ({
        project: {
            ...state.project,
            timeline: state.project.timeline.map((m, i) => (i === measureIndex ? {...m, pattern: patternId} : m)),
        }
    })),

    newSection: (at) => set((state) => ({
        project: {
            ...state.project,
            timeline: [...state.project.timeline.slice(undefined, at), {type: "section", name: "section"}, ...state.project.timeline.slice(at, undefined)],
        }
    })),

    setSectionName: (sectionIndex, name) => set((state) => ({
        project: {
            ...state.project,
            timeline: state.project.timeline.map((s, i) => (i === sectionIndex ? {...s, name: name} : s)),
        }
    })),
}))