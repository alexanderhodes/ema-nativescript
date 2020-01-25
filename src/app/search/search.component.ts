import { Component, OnInit } from "@angular/core";
import {PlatformService} from "~/app/shared/platform.service";
import {GeolocationService} from "~/app/shared/geolocation.service";
import {TextField} from "tns-core-modules/ui/text-field";
import {inputType} from "tns-core-modules/ui/dialogs";
import text = inputType.text;

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {

    name: string;

    constructor(private platformService: PlatformService,
                private geoLocationService: GeolocationService) {
        // Use the constructor to inject services.
        this.platformService.getProperties();
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    trackPosition(): void {
        this.geoLocationService.getCurrentLocation();
    }

    onReturnPress(event: any): void {
        let textField = <TextField> event.object;

        console.log('name', textField.text);
        console.log('ngModel', textField.text);
    }
}
