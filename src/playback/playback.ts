import { uploadAudio } from "../file/io";

interface PlaybackState {
    fileOpen: boolean,
    playing: boolean,
}

class Playback {

    private context: AudioContext | null = null;
    private audioEl = new Audio();

    private listeners = new Set<() => void>;
    private _state: Readonly<PlaybackState> = { fileOpen: false, playing: false };

    private createContext() {
        if (this.context === null) {
            this.context = new AudioContext();
            const track = this.context.createMediaElementSource(this.audioEl);
            track.connect(this.context.destination);
        }
        
        return this.context;
    }

    // load an audio file
    // unload the file
    // play it
    // pause it
    // get the current time in the audio
    // seek to some time in the audio

    async openAudio() {
        this.createContext();
        this.closeAudio();
        this.audioEl.src = await uploadAudio();
        this._state = {...this._state, fileOpen: true};
        this.emit();
    }

    closeAudio() {
        URL.revokeObjectURL(this.audioEl.src);
        this.audioEl.src = "";
        this._state = {...this._state, fileOpen: false};
        this.emit();
    }

    async play() {
        if (this.context?.state === "suspended") await this.context.resume();
        this.audioEl.play();
        this._state = {...this._state, playing: true};
        this.emit();
    }

    async pause() {
        if (this.context?.state === "suspended") await this.context.resume();
        this.audioEl.pause();
        this._state = {...this._state, playing: false};
        this.emit();
    }

    async seek(time: number) {
        if (this.context?.state === "suspended") await this.context.resume();
        this.audioEl.currentTime = time;
        this.emit(); // probably unnecessary
    }

    getCurrentTime = () => this.audioEl.currentTime;

    getDuration = () => this.audioEl.duration;

    // note to self: remember to bind this to the actual instance when passing it around
    subscribe(s: () => void) { 
        this.listeners.add(s);
        return () => this.listeners.delete(s);
    }

    private emit() {this.listeners.forEach((cb) => cb());}
    
    getState() {
        return this._state;
    }
}

export const playback = new Playback();