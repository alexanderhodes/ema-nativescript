import {Component, OnInit} from "@angular/core";
import {getDevicePushToken, setNotificationHandler} from "nativescript-pushy";
import {ConnectivityService} from "~/app/shared/services/connectivity.service";
import {PushyService} from "~/app/shared/services/pushy.service";
import {ToastService} from "~/app/shared/services/toast.service";
import {Vibrate} from "nativescript-vibrate";
import * as applicationModule from "tns-core-modules/application";
import { android as androidApp } from "tns-core-modules/application";
import { ios as iosApp } from "tns-core-modules/application";

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
                private pushyService: PushyService,
                private toastService: ToastService) {
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

    sendPushNotification(): void {
        if (this.hasConnection) {
            if (this.message) {
                this.pushyService.sendNotification(this._deviceToken, this.message).subscribe(res => {
                    console.log('sendNotification', res);
                    this.toastService.show('Benachrichtigung erfolgreich versendet');
                    this.message = '';
                });
            } else {
                this.toastService.show('Bitte geben Sie eine Nachricht ein');
            }
        } else {
            this.toastService.show('Keine Internet-Verbindung');
        }
    }

    requestNotificationToken(): void {
        if (this.hasConnection && !this._deviceToken) {
            getDevicePushToken()
                .then(token => {
                    console.log(`getDevicePushToken success, token: ${token}`);
                    this._deviceToken = token;
                })
                .catch(err => console.log(`getDevicePushToken error: ${err}`));
        }
    }

    vibrate(): void {
        const millis = 2000;
        this.toastService.show(`Vibration für ${millis / 1000} s startet`);
        const vibrator = new Vibrate();
        vibrator.vibrate(millis);
    }

    showAndroidToast(): void {
        if (applicationModule.android) {
            // get current context of application
            const context: android.content.Context = androidApp.context;
            // show text
            android.widget.Toast.makeText(context, 'Native Toast With HMR', android.widget.Toast.LENGTH_SHORT).show();
            // native vibration
            const vibrator: android.os.Vibrator = context.getSystemService(android.content.Context.VIBRATOR_SERVICE);
            vibrator.vibrate(500);
        } else {
            // is ios
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

}
