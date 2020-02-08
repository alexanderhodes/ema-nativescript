import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptCommonModule} from "nativescript-angular/common";

import {PlusRoutingModule} from "./plus-routing.module";
import {PlusComponent} from "./plus.component";
import {NativeScriptFormsModule} from "nativescript-angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PlusRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        PlusComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PlusModule { }
