import {Injectable} from "@angular/core";
import {ToastDuration, ToastPosition, Toasty} from "nativescript-toasty";

@Injectable({ providedIn: 'root' })
export class ToastService {

    constructor() {}

    show(text: string): void {
        new Toasty({ text: text, ios: {}, position: ToastPosition.BOTTOM, yAxisOffset: 70 }).setToastDuration(ToastDuration.SHORT).show();
    }

}
