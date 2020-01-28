import { Component, OnInit } from "@angular/core";
import {PhoneService} from "~/app/shared/services/phone.service";
import * as Toast from "nativescript-toast";
import {GeolocationService} from "~/app/shared/services/geolocation.service";
import * as email from "nativescript-email";
import {LocalStorageService} from "~/app/shared/services/local-storage.service";
import {STORAGE_EMAIL, STORAGE_PHONE} from "~/app/shared/config/storage-keys";

@Component({
    selector: "User",
    templateUrl: "./user.component.html"
})
export class UserComponent implements OnInit {

    phoneNumber: string;
    email: string;
    smsText: string;
    subject: string;
    emailText: string;
    currentTab: 'contact' | 'sms' | 'email' | 'calender';
    rows: {[key: string]: string};

    constructor(private phoneService: PhoneService,
                private localStorageService: LocalStorageService) {
        this.phoneNumber = this.localStorageService.getValue(STORAGE_PHONE);
        this.email = this.localStorageService.getValue(STORAGE_EMAIL);
        console.log('read values', this.phoneNumber, this.email);

        this.smsText = 'Text';
        this.subject = 'Betreff';
        this.emailText = 'Text';
        this.currentTab = 'contact';
        this.rows = {
            contact: '40, 40, 40',
            sms: '40, auto, 40',
            email: '40, 40, auto, 40',
            calender: '40, 40, 40, 40, 40'
        };
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    row(key: string): string {
        return this.rows[key];
    }

    changeTab(next: 'contact' | 'sms' | 'email' | 'calender'): void {
        this.currentTab = next;
    }

    call(): void {
        this.phoneService.call(this.phoneNumber);
    }

    sendSms(): void {
        this.phoneService.sendSms(this.phoneNumber, this.smsText);
    }

    save(): void {
        console.log('save clicked');
        this.localStorageService.setValue(STORAGE_EMAIL, this.email);
        this.localStorageService.setValue(STORAGE_PHONE, this.phoneNumber);
        Toast.makeText('gespeichert', 'short').show();
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
}
