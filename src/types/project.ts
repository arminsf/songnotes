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

export type Timeline = TimelineObject[];

export interface Project {
    name: string,
    bpm: number,
    key: string, // todo: music theory types
    timeSignNom: number,
    timeSignDen: number,
    phraseLength: number,
    patterns: Pattern[],
    timeline: Timeline,
}

export function validateProjectName(name: string): string {
    if (name === "") return "Untitled";
    name = name.split('').filter((c) => !['/', '\\', '"', '*', '>', '<', ':', '|', '?'].includes(c)).join('');
    return name;
}

// measure ranks are zero indexed
export function selectMeasure (timeline: Timeline, rank: number): number | null {
    let thisrank: number | null = null;
    for (let i = 0; i < timeline.length; i++) {
        if (timeline[i].type === "measure") {
            if (thisrank === null) thisrank = 0; else thisrank++;
            if (thisrank === rank) return i;
        }
    }
    return null;
}

export function rankMeasure (timeline: Timeline, index: number): number | null {
    let thisrank: number | null = null;
    for (let i = 0; i < timeline.length; i++) {
        if (timeline[i].type === "measure") {
            if (thisrank === null) thisrank = 0; else thisrank++;
            if (index === i) return thisrank;
        }
    }
    return null;
}

export function measureBeginSecond (project: Project, index: number) {
    const r = rankMeasure(project.timeline, index);
    return r && (r * project.timeSignNom * 60 / project.bpm);
}

// writing a function for this makes it easy to have measures with overridden time sigs
export function measureDurationSeconds (project: Project, index: number) {
    return (project.timeSignNom * 60 / project.bpm);
}

// these two will get more complicated later, that's why they get the whole project
export let measureRankAtSecond = (project: Project, second: number) => ({
    rank: Math.floor((project.bpm / project.timeSignNom) * (second / 60)),
    progress: ((project.bpm / project.timeSignNom) * (second / 60)) % 1
})