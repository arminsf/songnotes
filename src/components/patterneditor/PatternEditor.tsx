import { useState } from "react";
import {
  absChordName,
  chordRelative,
  noteInKey,
  noteName,
  parseNote,
  parseRelChord,
  relChordName,
  relChordNameRootOnly,
  ROMAN_NUMERALS,
  type NoteName,
  type RelChordName,
} from "../../musictheory/notes";
import { useEditorStore } from "../../store/editor-store";
import { useProjectStore } from "../../store/project-store";
import { PatternList } from "./PatternList";
import { colorToHexCode, hexCodeToColor } from "../../utils";
import { XCircleIcon } from "@phosphor-icons/react/dist/icons/XCircle";
import { TrashIcon } from "@phosphor-icons/react/dist/icons/Trash";
import { ClickableIcon } from "../ClickableIcon";

export function PatternEditor() {
  const [usingRelative, setUsingRelative] = useState(false);

  const selectedPatternId = useEditorStore((state) => state.selectedPatternId);
  const selectPattern = useEditorStore((state) => state.selectPattern);

  const key = useProjectStore((state) => state.project.key);
  const pattern = useProjectStore((state) =>
    state.project.patterns.find((p) => p.id === selectedPatternId),
  );
  const editPattern = useProjectStore((state) => state.editPattern);
  const deletePattern = useProjectStore((state) => state.deletePattern);

  return pattern ? (
    <div className="relative flex flex-col items-start gap-1 w-full h-full p-3">
      <div className="select-none absolute top-4 right-4 flex flex-col gap-3">
        <div onClick={() => selectPattern(null)}>
          <ClickableIcon Icon={XCircleIcon} size={24} />
        </div>

        <div
          onClick={() => {
            selectPattern(null);
            deletePattern(pattern.id);
          }}
        >
          <ClickableIcon Icon={TrashIcon} size={24} color="red" />
        </div>
      </div>

      <input
        className="w-60 text-xl p-1"
        type="text"
        value={pattern.name}
        onChange={(e) => editPattern(pattern.id, { name: e.target.value })}
      />

      <div className="flex gap-2 items-center flex-wrap">
        <span>Label: </span>
        <input
          className="border border-border-weak w-15 p-1"
          type="text"
          value={pattern.label}
          onChange={(e) => editPattern(pattern.id, { label: e.target.value })}
        />
        <span>Color: </span>
        <input
          className="h-full"
          type="color"
          value={colorToHexCode(pattern.color)}
          onChange={(e) => {
            editPattern(pattern.id, { color: hexCodeToColor(e.target.value) });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        {pattern.chords.map((chord, chordIndex) => (
          <div className="flex gap-1">
          {pattern  && (
              <>
                {!usingRelative ? (
                  <>
                    <select
                      key={`chord-${chordIndex}-a`}
                      className="border border-border-weak"
                      value={noteName(chord.root)}
                      onChange={(e) =>
                        editPattern(pattern.id, { chords: pattern.chords.map((c, i) => i === chordIndex ? {...c, root: parseNote(e.target.value as NoteName)} : c) })
                      }
                    >
                      <option key={`chord-${chordIndex}-a0`} value="">
                        -
                      </option>
                      {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                        <>
                          <option key={`chord-${chordIndex}` + letter + "b"} value={letter + "b"}>
                            {letter + "b"}
                          </option>
                          <option key={`chord-${chordIndex}` + letter} value={letter}>
                            {letter}
                          </option>
                          <option key={`chord-${chordIndex}` + letter + "s"} value={letter + "#"}>
                            {letter + "#"}
                          </option>
                        </>
                      ))}
                    </select>

                    <input
                      key={`chord-${chordIndex}-quala`}
                      className="border border-border-weak w-15"
                      list="chordtypes"
                      type="text"
                      value={chord.quality}
                      onChange={(e) =>
                        editPattern(pattern.id, { chords: pattern.chords.map((c, i) => i === chordIndex ? {...c, quality: e.target.value} : c) })
                      }
                    />
                  </>
                ) : (
                  <span
                    key={`chord-${chordIndex}-labela`}
                    className="hover:bg-highlight min-w-10 p-1 -m-1"
                    onClick={() => setUsingRelative(false)}
                  >
                    {absChordName(chord)}
                  </span>
                )}

                <span>=</span>

                {usingRelative ? (
                  <>
                    <select
                      key={`chord-${chordIndex}-abs`}
                      className="border border-border-weak"
                      value={relChordNameRootOnly(
                        chordRelative(chord, key),
                      )}
                      
                      onChange={(e) =>
                        editPattern(pattern.id, { chords: pattern.chords.map((c, i) => i === chordIndex ? {...c, root: noteInKey(parseRelChord(e.target.value as RelChordName).root, key)} : c) })
                      }
                    >
                      <option key={`chord-${chordIndex}-` + "r0"} value="">
                        -
                      </option>
                      {ROMAN_NUMERALS.map((letter) => (
                        <>
                          <option key={`chord-${chordIndex}-` + "b" + letter} value={"b" + letter}>
                            {"b" + letter}
                          </option>
                          <option key={`chord-${chordIndex}-` + letter} value={letter}>
                            {letter}
                          </option>
                          <option key={`chord-${chordIndex}-` + "s" + letter} value={"#" + letter}>
                            {"#" + letter}
                          </option>
                        </>
                      ))}
                    </select>

                    <input
                      key={`chord-${chordIndex}-qualr`}
                      className="border border-border-weak w-15"
                      list="chordtypes"
                      type="text"
                      value={chord.quality}
                      onChange={(e) =>
                        editPattern(pattern.id, { chords: pattern.chords.map((c, i) => i === chordIndex ? {...c, quality: e.target.value} : c) })
                      }
                    />
                  </>
                ) : (
                  <span
                    key={`chord-${chordIndex}-labelr`}
                    className="hover:bg-highlight min-w-10 p-1 -m-1"
                    onClick={() => setUsingRelative(true)}
                  >
                    {relChordName(chordRelative(chord, key))}
                  </span>
                )}

                <button
                  key={`chord-${chordIndex}-remove`}
                  onClick={() => editPattern(pattern.id, {chords: pattern.chords.filter((_, i) => i !== chordIndex)})}
                >
                  <ClickableIcon Icon={XCircleIcon} size={16} />
                </button>

                <datalist id="chordtypes">
                  <option value=" ">major</option>
                  <option>m</option>
                  <option>7</option>
                  <option>maj7</option>
                  <option>m7</option>
                  <option>dim</option>
                  <option>dim7</option>
                  <option>sus4</option>
                  <option>sus2</option>
                </datalist>
              </>
            )}
          </div>
        ))}

        <button
          className="border w-full px-4 hover:bg-highlight active:bg-pressed rounded-full"
          onClick={() => editPattern(pattern.id, {chords: [...pattern.chords, {root: key, quality: ""}]})}
        >
          + chord
        </button>
      </div>
        
      <textarea
        className="border border-border-strong resize-none w-full h-full p-2"
        value={pattern.notes}
        onChange={(e) => editPattern(pattern.id, { notes: e.target.value })}
      />
    </div>
  ) : (
    <div className="w-full h-full place-content-center text-center">
      <PatternList />
    </div>
  );
}
