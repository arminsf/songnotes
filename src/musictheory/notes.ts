type AtoG = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

type NoteName = `${AtoG}${'#' | 'b' | '##' | 'bb' | ''}`;

type Note = {
    letter: AtoG,
    accidental: number,
}

const MAJOR_SCALE_SEMITONES = [0, 2, 4, 5, 7, 9, 11];

const LETTER_INDEX: { [key in AtoG]: number } = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
}

const LETTER_SEMITONES: { [key in AtoG]: number } = {
    'A': 0,
    'B': 2,
    'C': 3,
    'D': 5,
    'E': 7,
    'F': 8,
    'G': 10,
}

function mod(a: number, b: number) {
    return ((a % b) + b) % b;
}

function signedSemitoneOffset(a: number) {
    return mod(a + 6, 12) - 6
}

function parseAccidentals(note: NoteName) {
    if (note.length === 1)
        return 0;
    else if (note.charAt(1) === "b")
        return -note.length + 1;
    else if (note.charAt(1) === "#")
        return note.length - 1;
    else
        throw new Error(`Invalid note: ${note}`);
}

function accidentalsAsString(accidental: number): string {
    if (accidental === 0)
        return '';
    else if (accidental > 0)
        return '#'.repeat(accidental);
    else
        return 'b'.repeat(-accidental);
}

export function parseNote(note: NoteName): Note {
    return {
        letter: note.charAt(0) as AtoG,
        accidental: parseAccidentals(note),
    }
}

function noteSemitones({letter, accidental}: Note): number {
    return LETTER_SEMITONES[letter] + accidental;
}

function notesIntervalOffset(n1: Note, n2: Note): number {
    return signedSemitoneOffset(noteSemitones(n2) - noteSemitones(n1));
}

export function degreeInKey(note: Note, key: Note): string {
    const intervalNumber = mod(LETTER_INDEX[note.letter] - LETTER_INDEX[key.letter], 7); // zero indexed, increment before showing user
    const naturalDegree = MAJOR_SCALE_SEMITONES[intervalNumber];
    const accidentalOffset = signedSemitoneOffset(notesIntervalOffset(key, note) - naturalDegree);
    return `${accidentalsAsString(accidentalOffset)}${1 + intervalNumber}`;
}

