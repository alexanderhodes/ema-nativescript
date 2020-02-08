import {Component, OnInit} from "@angular/core";
import {getDevicePushToken, setNotificationHandler} from "nativescript-pushy";
import {ConnectivityService} from "~/app/shared/services/connectivity.service";
import * as Toast from "nativescript-toast";
import {PushyService} from "~/app/shared/services/pushy.service";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    private _deviceToken: string;
    private hasConnection: boolean;
    private _message: string;
    private _type: string;

    constructor(private connectivityService: ConnectivityService,
                private pushyService: PushyService) {
    }

    ngOnInit(): void {
        this.connectivityService.hasInternetConnection().subscribe(hasConnection => {
            this.hasConnection = hasConnection;
            this.requestNotificationToken();
        });

        this.connectivityService.getConnectionType().subscribe(type => {
            this._type = type;
        });

        setNotificationHandler(notification => {
            console.log(`Notification received: ${JSON.stringify(notification)}`);
        });
    }

    sendPushNotification() {
        if (this.hasConnection) {
            if (this.message) {
                this.pushyService.sendNotification(this._deviceToken, this.message).subscribe(res => {
                    console.log('sendNotification', res);
                    Toast.makeText('Benachrichtigung erfolgreich versendet', 'short').show();
                    this.message = '';
                });
            } else {
                Toast.makeText('Bitte geben Sie eine Nachricht ein', 'short').show();
            }
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

    get deviceToken(): string {
        return this._deviceToken;
    }

    get message(): string {
        return this._message;
    }

    get type(): string {
        return this._type;
    }

    set message(value: string) {
        this._message = value;
    }

    set type(value: string) {
        this._type = value;
    }
}
