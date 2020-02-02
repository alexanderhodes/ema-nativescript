import { Component, OnInit } from "@angular/core";
import * as Toast from "nativescript-toast";
import {ImageService} from "~/app/shared/services/image.service";
import {SwipeGestureEventData} from "tns-core-modules/ui/gestures";
import {Picture} from "~/app/shared/models/picture.models";
import {DatabaseService} from "~/app/shared/services/database.service";

@Component({
    selector: "Heart",
    templateUrl: "./heart.component.html"
})
export class HeartComponent implements OnInit {

    pictures: Picture[];
    count: number;
    accountImage: string;
    displayGrid: boolean;
    liked: boolean;
    gridRows: string;
    listRows: string;

    constructor(private imageService: ImageService,
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

    tappedPicture(index: number): void {
//        Toast.makeText(`tapped ${index}`, 'short').show();
    }

    toggleDisplay(display: boolean): void {
//        this.displayGrid = display;
    }

    toggleLike(picture: Picture): void {
        console.log('toggleLike');
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
}
