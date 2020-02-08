import * as dialogs from "tns-core-modules/ui/dialogs";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DialogService {

    constructor() {}

    alert(title: string, message: string, buttonText: string): void {
        dialogs.alert({
            title,
            message,
            okButtonText: buttonText
        }).then();
    }

}
