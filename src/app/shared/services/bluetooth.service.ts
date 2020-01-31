import {Injectable} from "@angular/core";
import * as Bluetooth from "nativescript-bluetooth";


@Injectable({
    providedIn: "root"
})
export class BluetoothService {

    constructor() {}

    startScanning() {
        Bluetooth.startScanning({
            serviceUUIDs: [],
            seconds: 4,
            onDiscovered: function (peripheral) {
                console.log("Periperhal found with UUID: " + peripheral.UUID);
            },
            skipPermissionCheck: false
        }).then();
    }

}
