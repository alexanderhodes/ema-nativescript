import {Component, OnInit} from "@angular/core";
import {PhoneService} from "~/app/shared/services/phone.service";
import * as Toast from "nativescript-toast";
import {GeolocationService} from "~/app/shared/services/geolocation.service";
import * as email from "nativescript-email";
import {LocalStorageService} from "~/app/shared/services/local-storage.service";
import {STORAGE_EMAIL, STORAGE_PHONE} from "~/app/shared/config/storage-keys";
import * as Calendar from "nativescript-calendar";
import { screen } from "tns-core-modules/platform";

@Component({
    selector: "User",
    templateUrl: "./user.component.html"
})
export class UserComponent implements OnInit {

    phoneNumber: string;
    email: string;
    // sms
    smsText: string;
    // mail
    subject: string;
    emailText: string;
    // calender
    title: string;
    start: Date;
    end: Date;
    location: string;
    notes: string;
    // tabs
    currentTab: 'contact' | 'sms' | 'email' | 'calender';
    rows: { [key: string]: string };
    // design
    columns: string;

    constructor(private phoneService: PhoneService,
                private localStorageService: LocalStorageService) {
        this.phoneNumber = this.localStorageService.getValue(STORAGE_PHONE);
        this.email = this.localStorageService.getValue(STORAGE_EMAIL);
        console.log('read values', this.phoneNumber, this.email);

        this.smsText = 'Text';
        this.subject = 'Betreff';
        this.emailText = 'Text';
        this.currentTab = 'contact';

        this.start = new Date();
        this.end = new Date();
        this.title = '';
        this.location = '';
        this.notes = '';

        this.rows = {
            contact: '40, 40, 40',
            sms: '40, auto, 40',
            email: '40, 40, auto, 40',
            calender: '40, 40, 40, 40, 40, 40'
        };

        this.columns = this.getColumnWidth();
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

    getColumnWidth(): string {
        const width = screen.mainScreen.widthPixels - 176;
        console.log('columns', `${width / 2}, 176, ${width / 2}`);
        return `${width / 2}, 176, ${width / 2}`;
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

    saveAppointment(): void {
        let options = {
            title: this.title,
            startDate: this.start,
            endDate: this.end,
            location: this.location,
            notes: this.notes,
            calendar: null
        };

        Calendar.hasPermission().then(result => {
            console.log('hasPermission', result);
            if (result) {
                this.createEvent(options);
            } else {
                Calendar.requestPermission().then(response => this.createEvent(options));
            }
        });
    }

    private createEvent(options: Calendar.CreateEventOptions): void {
        Calendar.createEvent(options).then(result => console.log('result', result));
    }
}
