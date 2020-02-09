import {Component, OnInit} from "@angular/core";
import {PlatformPair, PlatformService} from "~/app/shared/services/platform.service";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: 'Device',
    templateUrl: './device.component.html'
})
export class DeviceComponent implements OnInit {

    values: PlatformPair[];
    rows: string;

    constructor(private _routerExtensions: RouterExtensions,
                private platformService: PlatformService) {}

    ngOnInit(): void {
        this.values = this.platformService.getValues();
        this.rows = this.createRows();
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }

    private createRows(): string {
        let text = '';
        for (let i = 0; i < this.values.length; i++) {
            text += 'auto' + (i+1 < this.values.length ? ',' : '')
        }
        return text;
    }

}
