import { Component, OnInit } from "@angular/core";
import * as Toast from "nativescript-toast";
import {ImageService} from "~/app/shared/services/image.service";

@Component({
    selector: "Heart",
    templateUrl: "./heart.component.html"
})
export class HeartComponent implements OnInit {

//    items: { text: string, backgroundColor: string }[];
    images: string[];
    count: number;
    accountImage: string;

    constructor(private imageService: ImageService) {
        // Use the component constructor to inject providers.
        this.images = [];
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
        this.images = this.imageService.findImages();

        this.count = this.images.length;

        this.accountImage = '~/images/account/photo-of-man-holding-phone-3475632.jpg';
    }

    rows(): string {
        let parts = this.count / 3;
        let rows = '';

        for (let i = 0; i < parts; i++) {
            rows += '120' + ((i+1) < parts ? ',' : '');
        }

        return rows;
    }

    tappedImage(index: number): void {
//        Toast.makeText(`tapped ${index}`, 'short').show();
    }
}
