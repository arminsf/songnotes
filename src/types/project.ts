export interface Pattern {
    id: number,
    name: string,
    label: string,
    color: string,
    chord?: string,
    notes: string,
}
export interface Measure {
    special?: string, // used later for line breaks, bpm changes, etc
    pattern: number | null
}

export interface Project {
    name: string,
    bpm: number,
    key: string, // todo: music theory types
    timeSignNom: number,
    timeSignDen: number,
    phraseLength: number,
    patterns: Pattern[],
    timeline: Measure[]
}