import {Injectable} from "@angular/core";
import {setString, getString} from "tns-core-modules/application-settings";

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {

    constructor() {
    }

    setValue(key: string, value: string): void {
        setString(key, value);
    }

    getValue(key: string): string {
        return getString(key);
    }

}
