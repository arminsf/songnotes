import { parseNote } from "../musictheory/notes.ts";
import type { Pattern, Project } from "../types/project"; 

import { hsvToRgb, colorToHexCode } from "../utils.ts";
import { create } from "zustand";

// import { produce } from "immer";

const initialProject: Project = {
        name: "Untitled",
        bpm: 120,
        key: parseNote("C"),
        timeSignNom: 4,
        timeSignDen: 4,
        phraseLength: 4,
        patterns: [],
        timeline: [
            {type: "measure", pattern: null},
            {type: "measure", pattern: null},
            {type: "measure", pattern: null},
            {type: "measure", pattern: null},
        ],
}

interface ProjectStore {
    project: Project,
    resetProject: () => void,
    loadProject: (project: Project) => void,
    editProject: (patch: Partial<Omit<Project, 'patterns' | 'timeline'>>) => void,

    editPattern: (patternId: number, patch: Partial<Pattern>) => void,
    shiftInTimeline: (index: number, offset: number) => void,
    removeFromTimeline: (index: number) => void,
    newPattern: (clickedMeasureIndex: number | null) => number | null,
    newMeasure: () => void,
    setMeasurePattern: (measureIndex: number, patternId: number | null) => void,
    newSection: (at: number) => void,
    newPause: (at: number) => void,
    setSectionName: (sectionIndex: number, name: string) => void,
    setPauseDuration: (pauseIndex: number, duration: number) => void,
}

export const useProjectStore = create<ProjectStore>((set) => ({
    project: initialProject,

    resetProject: () => set({project: initialProject}),

    loadProject: (project) => set({project: project}),

    editProject: (patch) => set((state) => {
        if (patch.bpm) {
            patch.bpm = Math.max(patch.bpm || 1, 1);
            patch.bpm = Math.min(patch.bpm || 522, 522);
        }

        return {
            project: {
                ...state.project,
                ...patch,
            } 
        }
    }),

    editPattern: (patternId, patch) => set((state) => ({
        project: {
            ...state.project,
            patterns: state.project.patterns.map((p) => p.id === patternId ? {...p, ...patch} : p),
        }
    })),

    // updates cache
    shiftInTimeline: (index: number, offset: number) => set((state) => {
        offset = Math.max(-index, offset);
        offset = Math.min(state.project.timeline.length - index - 1, offset);

        

        return (offset === 0) ? {} : { 
            project: {
                ...state.project,
                timeline: [
                    ...state.project.timeline.slice(undefined, Math.min(index, index + offset)),
                    ...(offset < 0 ? [state.project.timeline[index]] : []),
                    ...state.project.timeline.slice(Math.min(index, index + offset) + (offset > 0 ? 1 : 0), Math.max(index, index + offset) + (offset > 0 ? 1 : 0)),
                    ...(offset > 0 ? [state.project.timeline[index]] : []),
                    ...state.project.timeline.slice(Math.max(index, index + offset) + 1, undefined),
                ],
            }
        }
    }),

    // updates cache
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
            let newPatternId = Math.max(1 + Math.max(...state.project.patterns.map((p) => p.id)), 0);
            r = newPatternId;
            return {
                project: {
                    ...state.project,
                    patterns: [...state.project.patterns, 
                        {
                            id: newPatternId,
                            name: `New Pattern ${newPatternId}`,
                            label: `NP${newPatternId}`,
                            color: colorToHexCode(hsvToRgb(Math.random()*10, 0.2, 1)),
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

    newPause: (at) => set((state) => ({
        project: {
            ...state.project,
            timeline: [...state.project.timeline.slice(undefined, at), {type: "pause", duration: 0.5}, ...state.project.timeline.slice(at, undefined)],
        }
    })),

    setSectionName: (sectionIndex, name) => set((state) => ({
        project: {
            ...state.project,
            timeline: state.project.timeline.map((s, i) => (i === sectionIndex ? {...s, name: name} : s)),
        }
    })),

    setPauseDuration: (pauseIndex, duration) => set((state) => ({
        project: {
            ...state.project,
            timeline: state.project.timeline.map((s, i) => (i === pauseIndex ? {...s, duration: duration} : s)),
        }
    })),
}))