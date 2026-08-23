export interface Pattern {
    id: number,
    name: string,
    label: string,
    color: string,
    chord?: string,
    notes: string,
}

export interface Measure {
    type: "measure",
    pattern: number | null,
}

export interface Section {
    type: "section",
    name: string
}

export type TimelineObject = Measure | Section;

export interface Project {
    name: string,
    bpm: number,
    key: string, // todo: music theory types
    timeSignNom: number,
    timeSignDen: number,
    phraseLength: number,
    patterns: Pattern[],
    timeline: TimelineObject[]
}