import { Component, OnInit } from "@angular/core";
import {ConnectivityService} from "~/app/shared/connectivity.service";

@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    constructor(private connectivityService: ConnectivityService) {
        // Use the component constructor to inject providers.
        const connectionType = this.connectivityService.checkConnectionType();

        console.log('connectionType in browse-module', connectionType);
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
}
