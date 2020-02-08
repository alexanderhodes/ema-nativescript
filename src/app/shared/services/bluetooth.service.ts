import {Injectable} from "@angular/core";
// import {Bluetooth, StartScanningOptions} from "nativescript-bluetooth";

@Injectable({
    providedIn: "root"
})
export class BluetoothService {

    constructor() {
    }

    // startScanning(): void {
    //     this.isBluetoothEnabled().then(enabled => {
    //         if (enabled) {
    //             const options: StartScanningOptions = {
    //                 seconds: 4,
    //                 onDiscovered: function (peripheral) {
    //                     console.log("Periperhal found with UUID: " + peripheral.UUID);
    //                 },
    //                 skipPermissionCheck: false
    //             };
    //             Bluetooth.getBluetoothInstance().startScanning(options).then(result => {
    //                 console.log('result', result);
    //             });
    //         }
    //     })
    // }
    //
    // private isBluetoothEnabled() {
    //     return Bluetooth.getBluetoothInstance().isBluetoothEnabled().then(enabled => {
    //         console.log('enabled', enabled);
    //         return enabled;
    //     }, error => {
    //         return false;
    //     });
    // }

    // startScanning() {
    //     this.checkBluetoothConnection().then(enabled => {
    //         if (enabled) {
    //             Bluetooth.hasCoarseLocationPermission().then(granted => {
    //                 console.log('granted', granted);
    //                 if (granted) {
    //                     Bluetooth.startScanning({
    //                         serviceUUIDs: [],
    //                         seconds: 4,
    //                         onDiscovered: function (peripheral) {
    //                             console.log("Periperhal found with UUID: " + peripheral.UUID);
    //                         },
    //                         skipPermissionCheck: false
    //                     }).then(result => {
    //                         console.log('result', result);
    //                     });
    //                 }
    //             });
    //         } else {
    //             console.log('bluetooth not enabled');
    //         }
    //     }, error => {
    //         console.log('bluetooth not enabled');
    //     })
    //
    // }
    //
    // private checkBluetoothConnection() {
    //     return Bluetooth.isBluetoothEnabled().then((enabled: boolean) => {
    //         if (enabled) {
    //             return true;
    //         } else {
    //             Bluetooth.enable().then(result => {
    //                 return result;
    //             }, error => {
    //                 return false;
    //             })
    //         }
    //     }, error => {
    //         return false;
    //     });
    // }


}
