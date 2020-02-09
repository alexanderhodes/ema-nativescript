import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RouterExtensions} from "nativescript-angular/router";
import {GestureEventData, SwipeGestureEventData} from "tns-core-modules/ui/gestures";
import {Picture} from "~/app/shared/models/picture.models";
import {DatabaseService} from "~/app/shared/services/database.service";
import * as Toast from "nativescript-toast";
import {View} from "tns-core-modules/ui/core/view";
import {Label} from "tns-core-modules/ui/label";

@Component({
    selector: "ImageDetail",
    templateUrl: "./image-detail.component.html"
})
export class ImageDetailComponent implements OnInit {
    picture: Picture;
    index: number;

    constructor(
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private _databaseService: DatabaseService
    ) { }

    ngOnInit(): void {
        this.index = +this._route.snapshot.params.index;
        this._databaseService.findOne(`${this.index}`).subscribe(picture => this.picture = picture);
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }

    onSwipe(args: SwipeGestureEventData): void {
        const direction = args.direction.valueOf();

        if (direction === 1 || direction === 2) {
            // direction: 1 -> -1, direction: 2 -> +1
            const newIndex = this.index + (direction === 1 ? -1 : 1);

            this._databaseService.findOne(`${newIndex}`).subscribe((picture: Picture) => {
               if (picture) {
                   this.index = newIndex;
                   this.picture = picture;
               }
            });
        }
    }

    message(value: string): void {
        Toast.makeText(`${value} clicked`, 'short').show();
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
        this._databaseService.update(picture);
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
