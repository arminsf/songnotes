import { useEffect, useRef } from "react";
import { usePlayback } from "../../playback/usePlayback";

export function SeekBar() {
    const barRef = useRef<HTMLDivElement>(null);
    const fullbarRef = useRef<HTMLDivElement>(null);

    const { getCurrentTime, getDuration, seek } = usePlayback();

    useEffect(() => {
        let raf: number;
        const tick = () => {
            const w = 100 * getCurrentTime() / getDuration();
            if (barRef.current)
                barRef.current.style.width = `${w}%`;
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    });

    return (
    <div 
        className="flex-1 flex py-2 -my-2"
        onMouseDown={(e) => {
            if (fullbarRef.current) {
                const t = (e.pageX - fullbarRef.current.getBoundingClientRect().left) / fullbarRef.current.clientWidth;
                seek(t * getDuration());
            }
        }}
    >
        <div className="flex-1 bg-stone-300 h-1" ref={fullbarRef}>
            <div className="relative bg-stone-500 h-full" ref={barRef}>
                <div className="absolute size-3 bg-stone-500 rounded-full -right-1 -top-1"></div>
            </div>
        </div>
    </div>
    );
}