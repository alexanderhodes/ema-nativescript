import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HeartRoutingModule } from "./heart-routing.module";
import { HeartComponent } from "./heart.component";
import {ImageDetailComponent} from "~/app/heart/image-detail/image-detail.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HeartRoutingModule
    ],
    declarations: [
        HeartComponent,
        ImageDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HeartModule { }
