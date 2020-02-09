import {Injectable} from "@angular/core";
import { TNSTextToSpeech, SpeakOptions } from 'nativescript-texttospeech';
import {PlatformService} from "~/app/shared/services/platform.service";

@Injectable({ providedIn: 'root' })
export class SpeechService {

    private tts: TNSTextToSpeech;

    constructor(private platformService: PlatformService) {
        this.tts = new TNSTextToSpeech();
    }

    speak(text: string, locale: string = 'de-de') {
        let speakOptions: SpeakOptions = {
            text: text,
            speakRate: this.platformService.getIsIos() ? 0.5 : 1.0,
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
