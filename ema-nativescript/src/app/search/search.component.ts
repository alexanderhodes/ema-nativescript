import { Component, OnInit } from "@angular/core";
import {PlatformService} from "~/app/shared/platform.service";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {

    constructor(private platformService: PlatformService) {
        // Use the constructor to inject services.
        this.platformService.getProperties();
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
}
