import { Component, OnInit } from "@angular/core";
import { DataService, IDataItem } from "../shared/services/data.service";
import {getDevicePushToken, setNotificationHandler} from "nativescript-pushy";
import {ConnectivityService} from "~/app/shared/services/connectivity.service";
import * as Toast from "nativescript-toast";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    items: Array<IDataItem>;

    constructor(private _itemService: DataService,
                private connectivityService: ConnectivityService) {
        const connectionType = this.connectivityService.checkConnectionType();
        if (connectionType === "Wi-Fi" || connectionType === "Mobile") {
            getDevicePushToken()
                .then(token => console.log(`getDevicePushToken success, token: ${token}`))
                .catch(err => console.log(`getDevicePushToken error: ${err}`));
            setNotificationHandler(notification => {
                console.log(`Notification received: ${JSON.stringify(notification)}`);
            });
        } else {
            Toast.makeText("Es konnte keine Verbindung zu Pushy aufgebaut werden", "long").show();
        }
    }

    ngOnInit(): void {
        this.items = this._itemService.getItems();
    }
}
