import { Component, OnInit } from "@angular/core";
import {ConnectivityService} from "~/app/shared/services/connectivity.service";
import {PhoneService} from "~/app/shared/services/phone.service";
import * as Toast from "nativescript-toast";
import {GeolocationService} from "~/app/shared/services/geolocation.service";

@Component({
    selector: "User",
    templateUrl: "./user.component.html"
})
export class UserComponent implements OnInit {

    constructor(private connectivityService: ConnectivityService,
                private phoneService: PhoneService,
                private geolocationService: GeolocationService) {
        // Use the component constructor to inject providers.
        const connectionType = this.connectivityService.checkConnectionType();

        console.log('connectionType in browse-module', connectionType);
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    call(): void {
        Toast.makeText('Hello World', 'long').show();

        const number = "+49697912293";
//        this.phoneService.call(number);

        this.geolocationService.getCurrentLocation();
    }
}
