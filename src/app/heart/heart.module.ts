import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HeartRoutingModule } from "./heart-routing.module";
import { HeartComponent } from "./heart.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HeartRoutingModule
    ],
    declarations: [
        HeartComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HeartModule { }
