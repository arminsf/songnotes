type AtoG = "A" | "B" | "C" | "D" | "E" | "F" | "G";
type Accidentals = "#" | "b" | "##" | "bb" | "";

export type NoteName = `${AtoG}${Accidentals}`;
export type ScaleDegreeName = `${Accidentals}${number}`;
export type AbsChordName = `${AtoG}${string}`;
export type RelChordName =
  `${string}${"I" | "II" | "III" | "IV" | "V" | "VI" | "VII"}${string}`;

export type Note = {
  letter: AtoG;
  accidental: number;
};

export type ScaleDegree = {
  degreeNumber: number;
  accidental: number;
};

export type AbsChord = {
  root: Note;
  quality: string;
};

export type RelChord = {
  root: ScaleDegree;
  quality: string;
};

const MAJOR_SCALE_SEMITONES = [0, 2, 4, 5, 7, 9, 11];

export const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"];

const LETTER_INDEX: { [key in AtoG]: number } = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
};

const LETTER_SEMITONES: { [key in AtoG]: number } = {
  A: 0,
  B: 2,
  C: 3,
  D: 5,
  E: 7,
  F: 8,
  G: 10,
};

function mod(a: number, b: number) {
  return ((a % b) + b) % b;
}

function signedSemitoneOffset(a: number) {
  return mod(a + 6, 12) - 6;
}

function parseAccidentals(note: NoteName) {
  if (note.length === 1) return 0;
  else if (note.charAt(1) === "b") return -note.length + 1;
  else if (note.charAt(1) === "#") return note.length - 1;
  else throw new Error(`Invalid note: ${note}`);
}

function accidentalsAsString(accidental: number): Accidentals {
  if (accidental === 0) return "";
  else if (accidental > 0) return "#".repeat(accidental) as Accidentals;
  else return "b".repeat(-accidental) as Accidentals;
}

export function parseNote(note: NoteName): Note {
  return {
    letter: note.charAt(0) as AtoG,
    accidental: parseAccidentals(note),
  };
}

export function noteName(note: Note): NoteName {
  return `${note.letter}${accidentalsAsString(note.accidental)}` as NoteName;
}

export function degreeName(degree: ScaleDegree): ScaleDegreeName {
  return `${accidentalsAsString(degree.accidental)}${degree.degreeNumber + 1}`;
}

export function parseAbsChord(chord: AbsChordName): AbsChord {
  let qualityFirstCharacter = 1;
  while (
    qualityFirstCharacter < chord.length &&
    (chord.charAt(qualityFirstCharacter) === "b" ||
      chord.charAt(qualityFirstCharacter) === "#")
  )
    qualityFirstCharacter++;
  const root = parseNote(chord.slice(0, qualityFirstCharacter) as NoteName);
  const quality = chord.slice(qualityFirstCharacter);
  return { root, quality };
}

export function absChordName(chord: AbsChord): AbsChordName {
  return `${noteName(chord.root)}${chord.quality}`;
}

export function parseRelChord(chord: RelChordName): RelChord {
  let romanNumeralFirstCharacter = 0;
  while (
    romanNumeralFirstCharacter < chord.length &&
    (chord.charAt(romanNumeralFirstCharacter) === "b" ||
      chord.charAt(romanNumeralFirstCharacter) === "#")
  )
    romanNumeralFirstCharacter++;

  const accidental =
    romanNumeralFirstCharacter * (chord.charAt(0) === "b" ? -1 : 1);

  let degreeNumber = -1;
  for (let i = 0; i < ROMAN_NUMERALS.length; i++) {
    if (
      chord.startsWith(ROMAN_NUMERALS[i], romanNumeralFirstCharacter) &&
      (degreeNumber === -1 ||
        ROMAN_NUMERALS[degreeNumber].length <= ROMAN_NUMERALS[i].length)
    ) {
      degreeNumber = i;
    }
  }

  if (degreeNumber === -1) throw new Error(`Invalid chord: ${chord}`);

  const quality = chord.slice(
    romanNumeralFirstCharacter + ROMAN_NUMERALS[degreeNumber].length,
  );

  return { root: { degreeNumber, accidental }, quality };
}

export function relChordName(chord: RelChord): RelChordName {
  return `${accidentalsAsString(chord.root.accidental)}${ROMAN_NUMERALS[chord.root.degreeNumber]}${chord.quality}` as RelChordName;
}

export function relChordNameRootOnly(chord: RelChord): RelChordName {
  return `${accidentalsAsString(chord.root.accidental)}${ROMAN_NUMERALS[chord.root.degreeNumber]}` as RelChordName;
}

function noteSemitones({ letter, accidental }: Note): number {
  return LETTER_SEMITONES[letter] + accidental;
}

function notesIntervalOffset(n1: Note, n2: Note): number {
  return signedSemitoneOffset(noteSemitones(n2) - noteSemitones(n1));
}

export function degreeInKey(note: Note, key: Note): ScaleDegree {
  const degreeNumber = mod(
    LETTER_INDEX[note.letter] - LETTER_INDEX[key.letter],
    7,
  ); // zero indexed, increment before showing user
  const accidental = signedSemitoneOffset(
    notesIntervalOffset(key, note) - MAJOR_SCALE_SEMITONES[degreeNumber],
  );

  return { degreeNumber, accidental };
}

export function noteInKey(degree: ScaleDegree, key: Note): Note {
  const letterIndex = mod(LETTER_INDEX[key.letter] + degree.degreeNumber, 7);
  const letter = Object.keys(LETTER_INDEX).find(
    (l) => LETTER_INDEX[l as AtoG] === letterIndex,
  ) as AtoG;
  const accidental =
    MAJOR_SCALE_SEMITONES[degree.degreeNumber] -
    mod(LETTER_SEMITONES[letter] - LETTER_SEMITONES[key.letter], 12) +
    key.accidental +
    degree.accidental;
  return { letter, accidental };
}

export function chordRelative(chord: AbsChord, key: Note): RelChord {
  return { root: degreeInKey(chord.root, key), quality: chord.quality };
}

export function chordAbsolute(chord: RelChord, key: Note): AbsChord {
  return { root: noteInKey(chord.root, key), quality: chord.quality };
}
