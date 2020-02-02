import {Component, OnInit} from "@angular/core";
import {DataService, IDataItem} from "../shared/services/data.service";
import {getDevicePushToken, setNotificationHandler} from "nativescript-pushy";
import {ConnectivityService} from "~/app/shared/services/connectivity.service";
import * as Toast from "nativescript-toast";
import {PushyService} from "~/app/shared/services/pushy.service";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    items: Array<IDataItem>;
    private _deviceToken: string;
    private hasConnection: boolean;

    constructor(private _itemService: DataService,
                private connectivityService: ConnectivityService,
                private pushyService: PushyService) {
    }

    ngOnInit(): void {
        this.items = this._itemService.getItems();

        // ToDo: Connection überwachen über startMonitoring von
        this.connectivityService.hasInternetConnection().subscribe(hasConnection => {
            this.hasConnection = hasConnection;
            this.requestNotificationToken();
        });

        setNotificationHandler(notification => {
            console.log(`Notification received: ${JSON.stringify(notification)}`);
        });
    }

    get deviceToken(): string {
        return this._deviceToken;
    }

    sendPushNotification() {
        // ToDo: send Notification via http-Client
        // howto aus Pushy-Documentation entnehmen
        if (this.hasConnection) {
            const message = 'Hallo Welt!';

            this.pushyService.sendNotification(this._deviceToken, message).subscribe(res => {
                console.log('sendNotification', res);
                Toast.makeText('Benachrichtigung erfolgreich versendet', 'short').show();
            });
        } else {
            Toast.makeText('Keine Internet-Verbindung', 'short').show();
        }
    }

    requestNotificationToken() {
        if (this.hasConnection && !this._deviceToken) {
            getDevicePushToken()
                .then(token => {
                    console.log(`getDevicePushToken success, token: ${token}`);
                    this._deviceToken = token;
                })
                .catch(err => console.log(`getDevicePushToken error: ${err}`));
        }
    }
}
