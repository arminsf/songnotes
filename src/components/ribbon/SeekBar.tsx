import { useEffect, useRef, useState } from "react";
import { usePlayback } from "../../playback/usePlayback";

export function SeekBar() {
    const [dragging, setDragging] = useState(false);

    const hitboxRef = useRef<HTMLDivElement>(null);
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
        ref={hitboxRef}

        onPointerDown={(e) => {
            setDragging(true);
            if (fullbarRef.current) {
                const t = (e.pageX - fullbarRef.current.getBoundingClientRect().left) / fullbarRef.current.clientWidth;
                seek(t * getDuration());
            }
            if (hitboxRef.current) hitboxRef.current.setPointerCapture(e.pointerId);
        }}
        onPointerUp={(e) => {
            setDragging(false);
            if (hitboxRef.current) hitboxRef.current.releasePointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
            if (dragging && fullbarRef.current) {
                const t = (e.pageX - fullbarRef.current.getBoundingClientRect().left) / fullbarRef.current.clientWidth;
                seek(t * getDuration());
            }
        }}
    >
        <div className="flex-1 bg-border-weak h-1" ref={fullbarRef}>
            <div className="relative bg-border-strong h-full" ref={barRef}>
                <div className="absolute size-3 bg-border-strong rounded-full -right-1 -top-1"></div>
            </div>
        </div>
    </div>
    );
}