import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {STORAGE_PHONE} from "~/app/shared/config/storage-keys";
import {LocalStorageService} from "~/app/shared/services/local-storage.service";
import {PhoneService} from "~/app/shared/services/phone.service";

@Component({
    selector: 'Sms',
    templateUrl: './sms.component.html'
})
export class SmsComponent implements OnInit {

    smsText: string;
    phoneNumber: string;

    constructor(private _routerExtensions: RouterExtensions,
                private phoneService: PhoneService,
                private localStorageService: LocalStorageService) {
        this.smsText = 'Text';
    }

    ngOnInit(): void {
        this.phoneNumber = this.localStorageService.getValue(STORAGE_PHONE);
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }

    sendSms(): void {
        this.phoneService.sendSms(this.phoneNumber, this.smsText);
    }

}
