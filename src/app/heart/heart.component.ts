import { Component, OnInit } from "@angular/core";
import * as Toast from "nativescript-toast";
import {ImageService} from "~/app/shared/services/image.service";
import {SwipeGestureEventData} from "tns-core-modules/ui/gestures";
import {Picture} from "~/app/shared/models/picture.models";

@Component({
    selector: "Heart",
    templateUrl: "./heart.component.html"
})
export class HeartComponent implements OnInit {

    images: Picture[];
    count: number;
    accountImage: string;
    displayGrid: boolean;
    liked: boolean;

    constructor(private imageService: ImageService) {
        // Use the component constructor to inject providers.
        this.images = [];
        this.displayGrid = true;
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
        this.images = this.imageService.findImages();

        this.count = this.images.length;

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

    tappedImage(index: number): void {
//        Toast.makeText(`tapped ${index}`, 'short').show();
    }

    toggleDisplay(display: boolean): void {
        this.displayGrid = display;
        console.log('toggleDisplay', this.displayGrid);
    }

    toggleLike(): void {
        console.log('toggleLike');
        this.liked = !this.liked;
    }

    onSwipe(args: SwipeGestureEventData): void {
        const direction = args.direction.valueOf();

        if (direction === 1 || direction === 2) {
            // just toggle when swiping left and right
            this.toggleDisplay(!this.displayGrid);
        }
    }
}
