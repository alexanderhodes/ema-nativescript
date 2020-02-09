import {ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {SpeechService} from "~/app/shared/services/speech.service";
import {SpeechRecognitionService} from "~/app/shared/services/speech-recognition.service";
import {DialogService} from "~/app/shared/services/dialog.service";
import {FileService} from "~/app/shared/services/file.service";
import {ToastService} from "~/app/shared/services/toast.service";

@Component({
    selector: "Plus",
    templateUrl: "./plus.component.html"
})
export class PlusComponent implements OnInit, OnDestroy {

    text: string;
    private fileName;

    constructor(
        private speechService: SpeechService,
        private speechRecognitionService: SpeechRecognitionService,
        private changeDetectorRef: ChangeDetectorRef,
        private dialogService: DialogService,
        private fileService: FileService,
        private toastService: ToastService) {
        // Use the component constructor to inject providers.
        this.fileName = 'aufnahme.txt';
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
        this.read();
    }

    ngOnDestroy(): void {
        this.speechService.pause();
    }

    speak(): void {
        if (this.text) {
            this.speechService.speak(this.text);
        } else {
            this.toastService.show('Es muss ein Text eingegeben sein.');
        }
    }

    listen(): void {
        this.speechRecognitionService.startListening().subscribe((text: string) => {
            console.log('text', text);
            this.text = text;
            this.changeDetectorRef.detectChanges();
        }, error => {
            const title = 'Fehler';
            const message = 'Beim Starten der Sprachaufnahme ist ein Fehler aufgetreten.';
            this.dialogService.alert(title, message, 'ok');
        });
    }

    stopListen(): void {
        this.speechRecognitionService.stopListening();
    }

    clear(): void {
        this.text = '';
    }

    save(): void {
        const created = this.fileService.createFile(this.fileName, this.text);
        if (created) {
            const title = 'Speichern';
            const message = `Die Datei ${this.fileName} wurde erfolgreich gespeichert`;
            this.dialogService.alert(title, message, 'ok');
        }
    }

    read(): void {
        this.fileService.readFile(this.fileName).subscribe(text => this.text = text);
    }

}
