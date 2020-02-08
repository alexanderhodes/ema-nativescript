import {Injectable} from "@angular/core";
import { TNSTextToSpeech, SpeakOptions } from 'nativescript-texttospeech';

@Injectable({ providedIn: 'root' })
export class SpeechService {

    private tts: TNSTextToSpeech;

    constructor() {
        this.tts = new TNSTextToSpeech();
    }

    speak(text: string, locale: string = 'de-de') {
        let speakOptions: SpeakOptions = {
            text: text,
            speakRate: 1.0,
            pitch: 1.0,
            volume: 1.0,
            locale: locale,
            finishedCallback: Function
        };

        this.tts.speak(speakOptions);
    }

    pause() {
        this.tts.pause();
    }

}
