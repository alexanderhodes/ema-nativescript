import { Component, OnInit } from "@angular/core";
import {ConnectivityService} from "~/app/shared/connectivity.service";
import {PhoneService} from "~/app/shared/phone.service";

@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {

    constructor(private connectivityService: ConnectivityService,
                private phoneService: PhoneService) {
        // Use the component constructor to inject providers.
        const connectionType = this.connectivityService.checkConnectionType();

        console.log('connectionType in browse-module', connectionType);
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    call(): void {
        const number = "+49697912293";
        this.phoneService.call(number);
    }
}
