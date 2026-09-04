import { useEffect, useRef } from "react";
import { usePlayback } from "../../playback/usePlayback"
import { useProjectStore } from "../../store/project-store";
import { SeekBar } from "./SeekBar";

export function RibbonDJ() {
    const projectName = useProjectStore((state) => state.project.name);
    const { openAudio, closeAudio, play, pause, fileOpen, playing, getCurrentTime } = usePlayback();
    
    const timeelapsedRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const interval = setInterval(() => {
            const t = getCurrentTime();
            const m = String(Math.floor(t / 60) % 60).padStart(2, '0');
            const s = String(Math.floor(t) % 60).padStart(2, '0');
            const h = String(Math.floor(t * 100) % 100).padStart(2, '0');

            if (timeelapsedRef.current)
                timeelapsedRef.current.textContent = `${m}:${s}:${h}`;
        }, 70);

        return () => clearInterval(interval);
    }, []);

    return fileOpen ?
        (
                <div className="flex flex-col flex-1  px-3 border-l-2 border-stone-200">
                    <div className="select-none flex-1 flex gap-3 items-center">
                        <div className="flex-init hover:bg-stone-100 p-1 text-xl" onClick={() => {playing ? pause() : play();}}>
                            {playing ? "⏸️" : "▶️"}</div>
                        
                        <SeekBar />
                        <div className="flex-init hover:bg-stone-100 p-1" onClick={closeAudio}>unopen song</div>
                    </div>
                    <span ref={timeelapsedRef}>aaaa</span>
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