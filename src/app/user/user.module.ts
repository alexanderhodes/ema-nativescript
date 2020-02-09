import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptCommonModule} from "nativescript-angular/common";
import {UserRoutingModule} from "./user-routing.module";
import {UserComponent} from "./user.component";
import {SharedModule} from "~/app/shared/shared.module";
import {NativeScriptFormsModule} from "nativescript-angular";
import {SmsComponent} from "~/app/user/sms/sms.component";
import {EmailComponent} from "~/app/user/email/email.component";
import {CalendarComponent} from "~/app/user/calendar/calendar.component";
import {DeviceComponent} from "~/app/user/device/device.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        UserRoutingModule,
        SharedModule,
        NativeScriptFormsModule
    ],
    declarations: [
        UserComponent,
        SmsComponent,
        EmailComponent,
        CalendarComponent,
        DeviceComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UserModule { }
