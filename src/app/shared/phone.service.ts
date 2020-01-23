import {Injectable} from "@angular/core";
import * as phone from "nativescript-phone";

@Injectable({
    providedIn: "root"
})
export class PhoneService {

    constructor() {

    }

    call(number: string): void {
        // just works with confirm true because there has to be a permission allowing a direct call
        const confirm = true;
        const response = phone.dial(number, confirm);
        console.log('response', response);
    }

}
