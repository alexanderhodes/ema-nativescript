import {Component, OnInit} from "@angular/core";
import {ImageService} from "~/app/shared/services/image.service";
import {GestureEventData, SwipeGestureEventData} from "tns-core-modules/ui/gestures";
import {Picture} from "~/app/shared/models/picture.models";
import {DatabaseService} from "~/app/shared/services/database.service";
import * as Camera from "nativescript-camera";
import {ImageAsset} from "tns-core-modules/image-asset";
import {ImageSource} from "tns-core-modules/image-source";
import {knownFolders, path} from "tns-core-modules/file-system";
import {FileService} from "~/app/shared/services/file.service";
import * as Toast from "nativescript-toast";
import {View} from "tns-core-modules/ui/core/view";
import {Label} from "tns-core-modules/ui/label";

@Component({
    selector: "Heart",
    templateUrl: "./heart.component.html"
})
export class HeartComponent implements OnInit {

    pictures: Picture[];
    count: number;
    accountImage: string;
    displayGrid: boolean;
    imageSrc: string;
    gridRows: string;
    listRows: string;

    constructor(private imageService: ImageService,
                private fileService: FileService,
                private databaseService: DatabaseService) {
        // Use the component constructor to inject providers.
        this.pictures = [];
        this.displayGrid = true;
        this.gridRows = '';
        this.listRows = '';
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
        this.databaseService.findAll().subscribe((pictures: Picture[]) => {
            this.pictures = pictures;
            this.count = this.pictures.length;
            this.gridRows = this.rowsForGrid();
            this.listRows = this.rowsForList();
        });

        this.accountImage = '~/images/account/photo-of-man-holding-phone-3475632.jpg';
    }

    rowsForGrid(): string {
        let parts = this.count / 3;
        let rows = '';

        for (let i = 0; i < parts; i++) {
            rows += '120' + ((i+1) < parts ? ',' : '');
        }

        return rows;
    }

    rowForIndex(index: number): string {
        return `${index / 3}`;
    }

    colForIndex(index: number): string {
        return `${index % 3}`;
    }

    rowsForList(): string {
        let parts = this.count;
        let rows = '';

        for (let i = 0; i < parts; i++) {
            rows += '*' + ((i+1) < parts ? ',' : '');
        }

        return rows;
    }

    toggleDisplay(display: boolean): void {
        this.displayGrid = display;
    }

    toggleLike(picture: Picture, event: GestureEventData, view: Label): void {
        if (view) {
            view.visibility = 'visible';
            this.animateLike(view, true).then(() => {
                view.visibility = 'hidden';
            })
        } else {
            this.animateLike(event.view, false);
        }

        picture.liked = !picture.liked;
        this.databaseService.update(picture);
    }

    onSwipe(args: SwipeGestureEventData): void {
        const direction = args.direction.valueOf();

        if (direction === 1 || direction === 2) {
            // just toggle when swiping left and right
            this.toggleDisplay(!this.displayGrid);
        }
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

                this.databaseService.insert(picture).subscribe(pic => this.pictures.push(pic));
            }
        });
    }

    message(value: string): void {
        Toast.makeText(`${value} clicked`, 'short').show();
    }

    animateLike(view: View, tall: boolean): Promise<any> {
        return view.animate({
            scale: { x: 0.5, y: 0.5 },
            delay: 200,
            duration: 500,
        }).then(() => {
            view.animate({
                scale: tall ? { x: 2, y: 2 } : { x: 1.2, y: 1.2 },
                duration: tall ? 1000 : 500
            }).then(() => {
                view.animate({
                    scale: { x: 1, y: 1 },
                    duration: 200
                })
            });
        }).catch((e) => console.log(e.message));
    }
}
