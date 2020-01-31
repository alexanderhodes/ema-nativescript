import { Component, OnInit } from "@angular/core";
import {ImageService} from "~/app/shared/services/image.service";
import {CouchbaseService} from "~/app/shared/services/couchbase.service";
import {Picture} from "~/app/shared/models/picture.models";

@Component({
    selector: "Plus",
    templateUrl: "./plus.component.html"
})
export class PlusComponent implements OnInit {

    constructor(private imageService: ImageService,
                private couchbaseService: CouchbaseService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    storePictures(): void {
        this.imageService.findAll().subscribe((pictures: Picture[]) => {
            const response: string[] = this.imageService.storeImages(pictures);

            response.forEach(id => {
                const element = this.couchbaseService.get(id);
                console.log(id, element);
            });

            console.log('-----------------------------------');

            const all = this.couchbaseService.queryAll();
            console.log('all', all);
        })
    }

}
