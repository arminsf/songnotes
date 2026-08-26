import { usePlayback } from "../../playback/usePlayback"
import { useProjectStore } from "../../store/project-store";
import { SeekBar } from "./SeekBar";

export function RibbonDJ() {
    const projectName = useProjectStore((state) => state.project.name);
    const { openAudio, closeAudio, play, pause, fileOpen, playing } = usePlayback();
    
    return fileOpen ?
        (
                <div className="select-none flex-1 flex gap-3 px-3 items-center border-l-2 border-stone-200">
                    <div className="flex-init hover:bg-stone-100 p-1 text-xl" onClick={() => {playing ? pause() : play();}}>
                        {playing ? "⏸️" : "▶️"}</div>
                    <SeekBar />
                    <div className="flex-init hover:bg-stone-100 p-1" onClick={closeAudio}>unload song</div>
                </div>
        )
        :
        (
            <div 
                className="flex-1 bg-stone-100 hover:bg-stone-200 px-10 place-content-center"
                onClick={openAudio}
            >upload "{projectName}" audio file</div>
        )
}