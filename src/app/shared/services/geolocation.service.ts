import {Injectable} from "@angular/core";
import * as geolocation from "nativescript-geolocation";
import {Accuracy} from "tns-core-modules/ui/enums";
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class GeolocationService {

    private subject$: ReplaySubject<geolocation.Location>;

    constructor() {
        this.subject$ = new ReplaySubject<geolocation.Location>(1);
    }

    public getCurrentLocation(): Observable<geolocation.Location> {
        geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
            .then((location: geolocation.Location) => {
                console.log('location');
                console.log(location.timestamp);
                console.log(location.latitude);
                console.log(location.longitude);

                this.subject$.next(location);
                this.subject$.complete();
            });

        return this.subject$.asObservable();
    }

    private requestPermissions(): void {
        geolocation.enableLocationRequest().then(result => console.log('request permission', result));
    }


}
