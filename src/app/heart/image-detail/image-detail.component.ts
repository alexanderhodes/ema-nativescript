import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import {ImageService} from "~/app/shared/services/image.service";

@Component({
    selector: "ImageDetail",
    templateUrl: "./image-detail.component.html"
})
export class ImageDetailComponent implements OnInit {
    image: string;
    index: number;

    constructor(
        private _imageService: ImageService,
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        this.index = +this._route.snapshot.params.index;
        this.image = this._imageService.findImage(this.index);
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }
}
