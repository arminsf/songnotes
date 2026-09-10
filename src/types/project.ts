import type { AbsChord, Note } from "../musictheory/notes";
import type { RGB } from "../utils";

export interface Pattern {
  id: number;
  name: string;
  label: string;
  color: RGB;
  chord?: AbsChord;
  notes: string;
}

export interface Measure {
  type: "measure";
  pattern: number | null;
}

export interface Section {
  type: "section";
  name: string;
}

export interface Pause {
  type: "pause";
  duration: number;
}

export type TimelineObject = Measure | Section | Pause;

export type Timeline = TimelineObject[];

export interface Project {
  name: string;
  bpm: number;
  key: Note;
  timeSignNom: number;
  timeSignDen: number;
  phraseLength: number;
  patterns: Pattern[];
  timeline: Timeline;
}
