import {NgModule} from "@angular/core";
import {Routes} from "@angular/router";
import {NativeScriptRouterModule} from "nativescript-angular/router";

import {UserComponent} from "./user.component";
import {SmsComponent} from "~/app/user/sms/sms.component";
import {CalendarComponent} from "~/app/user/calendar/calendar.component";
import {EmailComponent} from "~/app/user/email/email.component";
import {DeviceComponent} from "~/app/user/device/device.component";

const routes: Routes = [
    {path: "default", component: UserComponent},
    {path: "sms", component: SmsComponent},
    {path: "email", component: EmailComponent},
    {path: "calendar", component: CalendarComponent},
    {path: "device", component: DeviceComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class UserRoutingModule {
}
