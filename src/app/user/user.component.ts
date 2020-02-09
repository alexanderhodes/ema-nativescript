import {Component, OnInit} from "@angular/core";
import {PhoneService} from "~/app/shared/services/phone.service";
import {LocalStorageService} from "~/app/shared/services/local-storage.service";
import {STORAGE_EMAIL, STORAGE_PHONE} from "~/app/shared/config/storage-keys";
import {PlatformService} from "~/app/shared/services/platform.service";
import {ToastService} from "~/app/shared/services/toast.service";

@Component({
    selector: "User",
    templateUrl: "./user.component.html"
})
export class UserComponent implements OnInit {

    phoneNumber: string;
    email: string;

    constructor(private phoneService: PhoneService,
                private localStorageService: LocalStorageService,
                private platformService: PlatformService,
                private toastService: ToastService) {
        this.phoneNumber = this.localStorageService.getValue(STORAGE_PHONE);
        this.email = this.localStorageService.getValue(STORAGE_EMAIL);
        console.log('read values', this.phoneNumber, this.email);
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    call(): void {
        if (this.phoneNumber) {
            this.phoneService.call(this.phoneNumber);
        } else {
            this.toastService.show('Es muss eine Telefonnummer gespeichert sein.');
        }
    }

    tapped(text: string): void {
        switch (text) {
            case 'phone':
                this.call();
                break;
            case 'sms':
//                this.router.navigate(['/sms']);
//                Toast.makeText(`tapped ${text}`, 'short').show();
                break;
            case 'email':
//                Toast.makeText(`tapped ${text}`, 'short').show();
                break;
            case 'calendar':
//                Toast.makeText(`tapped ${text}`, 'short').show();
                break;
        }
    }

    save(): void {
        console.log('save clicked');
        if (this.email) {
            this.localStorageService.setValue(STORAGE_EMAIL, this.email);
        }
        if (this.phoneNumber) {
            this.localStorageService.setValue(STORAGE_PHONE, this.phoneNumber);
        }
        this.toastService.show('gespeichert');
    }

    isIos(): boolean {
        return this.platformService.getIsIos();
    }

}
