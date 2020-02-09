import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {STORAGE_EMAIL} from "~/app/shared/config/storage-keys";
import {LocalStorageService} from "~/app/shared/services/local-storage.service";
import * as email from "nativescript-email";
import {PlatformService} from "~/app/shared/services/platform.service";

@Component({
    selector: 'Sms',
    templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {

    email: string;
    subject: string;
    emailText: string;

    constructor(private _routerExtensions: RouterExtensions,
                private localStorageService: LocalStorageService,
                private platformService: PlatformService) {
        this.subject = 'Betreff';
        this.emailText = 'Text';
    }

    ngOnInit(): void {
        this.email = this.localStorageService.getValue(STORAGE_EMAIL);
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }

    sendMail(): void {
        email.available().then((result: boolean) => {
            if (result) {
                email.compose({
                    subject: this.subject,
                    body: this.emailText,
                    to: [this.email]
                }).then(composed => console.log('result', composed));
            }
        });
    }

    isIos(): boolean {
        return this.platformService.getIsIos();
    }

}
