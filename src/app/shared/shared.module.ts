import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import {UserHeaderComponent} from "~/app/shared/components/user-header/user-header.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
    ],
    declarations: [
        UserHeaderComponent
    ],
    exports: [
        UserHeaderComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
