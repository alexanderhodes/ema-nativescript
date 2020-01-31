import { Component, OnInit } from "@angular/core";
import {PlatformService} from "~/app/shared/services/platform.service";
import {GeolocationService} from "~/app/shared/services/geolocation.service";
import {TextField} from "tns-core-modules/ui/text-field";
import {NotificationService} from "~/app/shared/services/notification.service";
import {FileService} from "~/app/shared/services/file.service";
import * as geolocation from "nativescript-geolocation";
import * as Camera from "nativescript-camera";
import {WhatThreeWordsService} from "~/app/shared/services/what.three.words.service";
import {WhatsThreeWords} from "~/app/shared/models/what.three.words.model";
import {knownFolders, path, File} from "tns-core-modules/file-system";
import {ImageAsset} from "tns-core-modules/image-asset";
import {ImageSource} from "tns-core-modules/image-source";
import {ImageService} from "~/app/shared/services/image.service";
import {Picture} from "~/app/shared/models/picture.models";
import {BluetoothService} from "~/app/shared/services/bluetooth.service";

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
    imageSrc: string;
    count: number;

    constructor(private platformService: PlatformService,
                private geoLocationService: GeolocationService,
                private notificationService: NotificationService,
                private fileService: FileService,
                private whatThreeWordsService: WhatThreeWordsService,
                private imageService: ImageService,
                private bluetoothService: BluetoothService) {
        // Use the constructor to inject services.
        this.platformService.getProperties();
//        this.notificationService.schedule();
        this.count = 0;
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
        this.imageSrc = "/data/user/0/org.nativescript.emanativescript/files/test.jpg";
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
        const permission = Camera.requestPermissions().then(
            function success() {
                return true;
            },
            function error() {
                console.log('kein Zugriff auf die Kamera');
                return false;
            }
        );

        const imageAssetPromise = permission.then((value: boolean) => {
           if (value) {
               const options = { saveToGallery: false };
               return Camera.takePicture(options);
           }
        });

        imageAssetPromise.then((imageAsset: ImageAsset) => this.saveImage(imageAsset));
    }

    saveImage(imageAsset: ImageAsset): void {
        const source = new ImageSource();

        source.fromAsset(imageAsset).then((imageSource: ImageSource) => {

            const folderPath: string = knownFolders.documents().path;
            const fileName: string = `test-${this.count}.jpg`;
            const filePath: string = path.join(folderPath, fileName);
            const saved: boolean = imageSource.saveToFile(filePath, "jpg");

            if (saved) {
                console.log("Saved: " + filePath);
                console.log("Image saved successfully!");
                this.imageSrc = filePath;
                this.count += 1;

                const picture: Picture = {
                    url: filePath,
                    liked: false,
                    name: fileName
                };

                this.imageService.addImage(picture);
            }
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

    reloadImage(): void {
        const oldPath = this.imageSrc;
        this.imageSrc = '';
        this.imageSrc = oldPath;
    }

    scan(): void {
        this.bluetoothService.startScanning();
    }
}
