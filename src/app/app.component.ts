import {Component, OnDestroy, OnInit} from "@angular/core";
import {ImageService} from "~/app/shared/services/image.service";
import {DatabaseService} from "~/app/shared/services/database.service";
import {ConnectivityService} from "~/app/shared/services/connectivity.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private imageService: ImageService,
                private databaseService: DatabaseService,
                private connectivityService: ConnectivityService) {
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

        this.connectivityService.start();
    }

    ngOnDestroy(): void {
        console.log('destroying app component');
        this.connectivityService.stop();
    }
}
