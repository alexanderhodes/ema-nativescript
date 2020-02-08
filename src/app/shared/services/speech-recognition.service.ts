import {Injectable} from "@angular/core";
import {
    SpeechRecognition,
    SpeechRecognitionOptions,
    SpeechRecognitionTranscription
} from "nativescript-speech-recognition";
import {Observable, ReplaySubject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class SpeechRecognitionService {

    private speechRecognition: SpeechRecognition;

    constructor() {
        this.speechRecognition = new SpeechRecognition();
    }

    startListening(): Observable<string> {
        const subject$ = new ReplaySubject<string>();

        const options: SpeechRecognitionOptions = {
            locale: 'de-de',
            returnPartialResults: true,
            onResult: ((transcription: SpeechRecognitionTranscription) => {
                console.log(`User said: ${transcription.text}`);
                console.log(`User finished?: ${transcription.finished}`);
                subject$.next(transcription.text);
                if (transcription.finished) {
                    subject$.complete();
                }
            }),
            onError: (error => {
                console.log('error', error);
            })
        };

        this.speechRecognition.startListening(options).then(
            (started: boolean) => { console.log(`started listening`) },
            (errorMessage: string) => { console.log(`Error: ${errorMessage}`); }
        );

        return subject$.asObservable();
    }

    stopListening(): Promise<any> {
        return this.speechRecognition.stopListening().then(result => {
            return result;
        });
    }


}
