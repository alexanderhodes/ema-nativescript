import {Injectable} from "@angular/core";
import {device, isAndroid, isIOS} from "tns-core-modules/platform";

export interface PlatformPair {
    key: string;
    value: string;
}

@Injectable({
    providedIn: "root"
})
export class PlatformService {

    constructor() {}

    getProperties(): void {
        console.log(`Running on Android? ${isAndroid}`);
        console.log(`Running on iOS? ${isIOS}`);

        console.log(`device.model ${device.model}`); // For example: "Nexus 5" or "iPhone".
        console.log(`device.deviceType ${device.deviceType}`); // "Phone" | "Tablet"
        console.log(`device.os ${device.os}`); // For example: "Android" or "iOS".
        console.log(`device.osVersion ${device.osVersion}`); // For example: 4.4.4(android), 8.1(ios)
        console.log(`device.sdkVersion ${device.sdkVersion}`); //  For example: 19(android), 8.1(ios).
        console.log(`device.language ${device.language}`); // For example "en" or "en-US".
        console.log(`device.manufacturer ${device.manufacturer}`); // For example: "Apple" or "HTC" or "Samsung".
        console.log(`device.uuid ${device.uuid}`); // The unique identification number
        console.log(`device.region ${device.region}`); //  For example "US".
    }

    getValues(): PlatformPair[] {
        const array = [];

        array.push({key: 'isAndroid', value: isAndroid });
        array.push({key: 'isIOS', value: isIOS });
        array.push({key: 'Device', value: device.model });
        array.push({key: 'OS', value: device.os });
        array.push({key: 'OS Version', value: device.osVersion });
        array.push({key: 'SDK Version', value: device.sdkVersion });
        array.push({key: 'Language', value: device.language });
        array.push({key: 'Manufacturer', value: device.manufacturer });
        array.push({key: 'UUID', value: device.uuid });
        array.push({key: 'Region', value: device.region });

        return array;
    }

}
