import * as connectivityModule from "tns-core-modules/connectivity";
import {getConnectionType} from "tns-core-modules/connectivity";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ConnectivityService {

    public checkConnectionType (): string {
        const type = getConnectionType();
        let connectionType: string;

        switch (type) {
            case connectivityModule.connectionType.none:
                connectionType = "None";
                break;
            case connectivityModule.connectionType.wifi:
                connectionType = "Wi-Fi";
                break;
            case connectivityModule.connectionType.mobile:
                connectionType = "Mobile";
                break;
            case connectivityModule.connectionType.bluetooth:
                connectionType = "Bluetooth";
                break;
            default:
                break;
        }

        console.log('connection-type', connectionType);
        return connectionType;
    }

}
