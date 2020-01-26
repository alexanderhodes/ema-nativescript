import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        UserRoutingModule
    ],
    declarations: [
        UserComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UserModule { }
