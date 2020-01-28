import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { SharedModule } from "~/app/shared/shared.module";
import {NativeScriptFormsModule} from "nativescript-angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        UserRoutingModule,
        SharedModule,
        NativeScriptFormsModule
    ],
    declarations: [
        UserComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UserModule { }
