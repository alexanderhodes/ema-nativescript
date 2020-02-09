import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import {ImageService} from "~/app/shared/services/image.service";
import {SwipeGestureEventData} from "tns-core-modules/ui/gestures";
import {Picture} from "~/app/shared/models/picture.models";
import {DatabaseService} from "~/app/shared/services/database.service";

@Component({
    selector: "ImageDetail",
    templateUrl: "./image-detail.component.html"
})
export class ImageDetailComponent implements OnInit {
    image: Picture;
    index: number;

    constructor(
        private _imageService: ImageService,
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private _databaseService: DatabaseService
    ) { }

    ngOnInit(): void {
        this.index = +this._route.snapshot.params.index;
        this._databaseService.findOne(`${this.index}`).subscribe(picture => this.image = picture);
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }

    onSwipe(args: SwipeGestureEventData): void {
        const direction = args.direction.valueOf();
        console.log('swipe-direction', direction);

        if (direction === 1 || direction === 2) {
            // direction: 1 -> -1, direction: 2 -> +1
            const newIndex = this.index + (direction === 1 ? -1 : 1);

            if (newIndex >= 0 && newIndex < this._imageService.count()) {
                this.index = newIndex;
                this.image = this._imageService.findImage(this.index);
            }
        }
    }
}
