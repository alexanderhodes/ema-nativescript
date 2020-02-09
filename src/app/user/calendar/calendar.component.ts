import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {PhoneService} from "~/app/shared/services/phone.service";
import {LocalStorageService} from "~/app/shared/services/local-storage.service";
import {STORAGE_EMAIL} from "~/app/shared/config/storage-keys";
import * as Calendar from "nativescript-calendar";
import {PlatformService} from "~/app/shared/services/platform.service";

@Component({
    selector: 'Sms',
    templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {

    email: string;
    title: string;
    start: Date;
    end: Date;
    location: string;
    notes: string;

    constructor(private _routerExtensions: RouterExtensions,
                private localStorageService: LocalStorageService,
                private platformService: PlatformService) {
        this.start = new Date();
        this.end = new Date();
        this.title = '';
        this.location = '';
        this.notes = '';
    }

    ngOnInit(): void {
        this.email = this.localStorageService.getValue(STORAGE_EMAIL);
    }

    onBackTap(): void {
        this._routerExtensions.back();
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

    isIos(): boolean {
        return this.platformService.getIsIos();
    }

}
