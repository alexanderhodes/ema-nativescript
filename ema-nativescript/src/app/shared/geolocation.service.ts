import {Injectable} from "@angular/core";
import * as geolocation from "nativescript-geolocation";
import {Accuracy} from "tns-core-modules/ui/enums";

@Injectable({
    providedIn: "root"
})
export class GeolocationService {

    constructor() {

    }

    public getCurrentLocation(): void {
//        this.requestPermissions();

        geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
            .then((location: geolocation.Location) => {
                console.log('location');
                console.log(location.timestamp);
                console.log(location.latitude);
                console.log(location.longitude);
            })
    }

    private requestPermissions(): void {
        geolocation.enableLocationRequest().then(result => console.log('request permission', result));
    }


}
