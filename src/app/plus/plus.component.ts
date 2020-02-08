import { Component, OnInit } from "@angular/core";
import {ImageService} from "~/app/shared/services/image.service";

@Component({
    selector: "Plus",
    templateUrl: "./plus.component.html"
})
export class PlusComponent implements OnInit {

    constructor(private imageService: ImageService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    storePictures(): void {
    }

}
