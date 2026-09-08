import type { Project, Timeline } from "../types/project";

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

// writing a function for this makes it easy to have measures with overridden time sigs
export function measureDurationSeconds (project: Project, index: number) {
    index; // will need later, just need to shut typescript up
    return (project.timeSignNom * 60 / project.bpm);
}

// maybe give a cache to this. it should also set the cache
export function timelineObjectBeginSecond(project: Project, index: number) {
    let timestamp = 0;
    for (let i = 0; i < project.timeline.length; i++) {
        if (i === index) return timestamp;
        const object = project.timeline[i];

        if (object.type === "measure")
            timestamp += (project.timeSignNom * 60 / project.bpm); // todo: overridable time signature in pattern

        if (object.type === "pause") {
            timestamp += object.duration;
        }
    }

    return null;
}

// these two will get more complicated later, that's why they get the whole project
// todo: maybe add a cache argument to this
export function measureRankAtSecond (project: Project, second: number) {
    return {
        rank: Math.floor((project.bpm / project.timeSignNom) * (second / 60)),
        progress: ((project.bpm / project.timeSignNom) * (second / 60)) % 1
    }
}