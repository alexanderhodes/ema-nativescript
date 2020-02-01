import { Component, OnInit } from "@angular/core";
import {ImageService} from "~/app/shared/services/image.service";
import {DatabaseService} from "~/app/shared/services/database.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

    constructor(private imageService: ImageService,
                private databaseService: DatabaseService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        // add images to database that are in resource
        this.databaseService.findAll().subscribe(res => {
            if (!res || res.length === 0) {
                const images = this.imageService.findAllResourceImages();
                images.forEach(pic => this.databaseService.insert(pic));
            }
        },error => console.log('error', error));
    }
}
