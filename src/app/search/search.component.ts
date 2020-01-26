import { Component, OnInit } from "@angular/core";
import {PlatformService} from "~/app/shared/services/platform.service";
import {GeolocationService} from "~/app/shared/services/geolocation.service";
import {TextField} from "tns-core-modules/ui/text-field";
import {NotificationService} from "~/app/shared/services/notification.service";
import {FileService} from "~/app/shared/services/file.service";
import * as geolocation from "nativescript-geolocation";
import * as Camera from "nativescript-camera";
import { Image } from "tns-core-modules/ui/image";
import {WhatThreeWordsService} from "~/app/shared/services/what.three.words.service";
import {WhatsThreeWords} from "~/app/shared/models/what.three.words.model";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {

    name: string;
    longitude: number;
    latitude: number;
    timestamp: Date;
    words: string;

    constructor(private platformService: PlatformService,
                private geoLocationService: GeolocationService,
                private notificationService: NotificationService,
                private fileService: FileService,
                private whatThreeWordsService: WhatThreeWordsService) {
        // Use the constructor to inject services.
        this.platformService.getProperties();
//        this.notificationService.schedule();
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    trackPosition(): void {
        console.log('trackPosition');
        this.geoLocationService.getCurrentLocation()
            .pipe()
            .subscribe((res: geolocation.Location) => {
                this.latitude = res.latitude;
                this.longitude = res.longitude;
                this.timestamp = res.timestamp;
            });
    }

    takePhoto(): void {
        Camera.takePicture().
        then((imageAsset) => {
            console.log("Result is an image asset instance");
            let image = new Image();
            image.src = imageAsset;
        }).catch((err) => {
            console.log("Error -> " + err.message);
        });
    }

    onReturnPress(event: any): void {
        let textField = <TextField> event.object;

        console.log('name', textField.text);
        console.log('ngModel', textField.text);

        const fileName = 'test.txt';
        const content = 'Das ist ein Test, um in eine Datei zu schreiben.';
        this.fileService.createFile(fileName, content);
        this.fileService.readFile(fileName);
    }

    findWordsByPosition() {
        if (this.longitude && this.latitude) {
            this.whatThreeWordsService.get(this.longitude, this.latitude).subscribe((response: WhatsThreeWords) => {
                console.log('words', response.words);
                this.words = response.words;
            });
        }
    }
}
