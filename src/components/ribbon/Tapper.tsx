import { useState } from "react";

export function Tapper() {
  const [start, setStart] = useState(-1);
  const [runAv, setRunAv] = useState(0);
  const [taps, setTaps] = useState(0);
  const [timeoutHandle, setTimeoutHandle] = useState(0);

  const tap = () => {
    const now = Math.round(performance.now());
    if (taps == 0) {
      setStart(now);
    } else {
      if (runAv > 0) {
        const newAv = (taps * 60000) / (now - start);
        setRunAv((runAv + newAv) / 2);
      } else {
        setRunAv(60000 / (now - start));
      }
    }

    setTaps(taps + 1);

    clearTimeout(timeoutHandle);
    setTimeoutHandle(
      setTimeout(() => {
        setStart(0);
        setRunAv(0);
        setTaps(0);
      }, 2000),
    );
  };

  return (
    <button
      className="font-mono border w-full px-4 hover:bg-highlight active:bg-pressed rounded-full"
      onClick={tap}
    >
      tap! {runAv && Math.round(runAv)}
    </button>
  );
}
