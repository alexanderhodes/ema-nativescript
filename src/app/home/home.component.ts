import { Component, OnInit } from "@angular/core";
import { DataService, IDataItem } from "../shared/services/data.service";
import {getDevicePushToken, setNotificationHandler} from "nativescript-pushy";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    items: Array<IDataItem>;

    constructor(private _itemService: DataService) {
        getDevicePushToken()
            .then(token => console.log(`getDevicePushToken success, token: ${token}`))
            .catch(err => console.log(`getDevicePushToken error: ${err}`));
        setNotificationHandler(notification => {
            console.log(`Notification received: ${JSON.stringify(notification)}`);
        });
    }

    ngOnInit(): void {
        this.items = this._itemService.getItems();
    }
}
