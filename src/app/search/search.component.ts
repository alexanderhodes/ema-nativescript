import {Component, OnInit} from "@angular/core";
import {GeolocationService} from "~/app/shared/services/geolocation.service";
import * as geolocation from "nativescript-geolocation";
import {WhatThreeWordsService} from "~/app/shared/services/what.three.words.service";
import {WhatsThreeWords} from "~/app/shared/models/what.three.words.model";
import {BluetoothService} from "~/app/shared/services/bluetooth.service";
import {registerElement} from "nativescript-angular/element-registry";
import {ApiTokenService} from "~/app/shared/services/api-token.service";
import {ConnectivityService} from "~/app/shared/services/connectivity.service";
import * as Toast from "nativescript-toast";

registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {

    longitude: number;
    latitude: number;
    timestamp: Date;
    words: string;
    located: boolean;
    nearestPlace: string;
    private _hasConnection: boolean;

    constructor(private geoLocationService: GeolocationService,
                private whatThreeWordsService: WhatThreeWordsService,
                private bluetoothService: BluetoothService,
                private apiTokenService: ApiTokenService,
                private connectivityService: ConnectivityService) {
        // Use the constructor to inject services.
        this.located = false;

        this.connectivityService.hasInternetConnection().subscribe(hasConnection => this._hasConnection = hasConnection);
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    trackPosition(): void {
        this.geoLocationService.getCurrentLocation()
            .pipe()
            .subscribe((res: geolocation.Location) => {
                this.latitude = res.latitude;
                this.longitude = res.longitude;
                this.timestamp = res.timestamp;
                this.located = true;
            }, error => Toast.makeText('Die Position konnte nicht ermittelt werden', 'short'));
    }

    onMapReady(args) {
        // you can tap into the native MapView objects (MGLMapView for iOS and com.mapbox.mapboxsdk.maps.MapView for Android)
        const nativeMapView = args.ios ? args.ios : args.android;
        console.log("Mapbox onMapReady for " + (args.ios ? "iOS" : "Android") + ", native object received: " + nativeMapView);

        // .. or use the convenience methods exposed on args.map, for instance:
        args.map.addMarkers([
            {
                lat: this.latitude,
                lng: this.longitude,
                title: 'Aktuelle Position',
                subtitle: 'Deine Position',
                selected: true,
                onCalloutTap: function(){console.log("'Nice location' marker callout tapped");}
            }]);
    }

    findWordsByPosition() {
        if (this.hasConnection) {
            if (this.longitude && this.latitude) {
                this.whatThreeWordsService.get(this.longitude, this.latitude).subscribe((response: WhatsThreeWords) => {
                    console.log('words', response.words);
                    this.words = response.words;
                    this.nearestPlace = response.nearestPlace;
                });
            } else {
                Toast.makeText('Position muss zunächst ermittelt werden', 'short').show();
            }
        } else {
            Toast.makeText('Keine Internet-Verbindung', 'short').show();
        }
    }

    apiToken(): string {
        return this.apiTokenService.mapbox;
    }

    scan(): void {
        // this.bluetoothService.startScanning();
    }

    get hasConnection(): boolean {
        return this._hasConnection;
    }
}
