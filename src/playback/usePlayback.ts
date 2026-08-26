import { useSyncExternalStore } from "react";
import { playback } from "./playback";

export function usePlayback() {
    const state = useSyncExternalStore(playback.subscribe.bind(playback), playback.getState.bind(playback));

    return {
       ...state,
       openAudio: playback.openAudio.bind(playback),
       closeAudio: playback.closeAudio.bind(playback),
       play: playback.play.bind(playback),
       pause: playback.pause.bind(playback),
       seek: playback.seek.bind(playback),
       getCurrentTime: playback.getCurrentTime.bind(playback),
       getDuration: playback.getDuration.bind(playback),
    };
}