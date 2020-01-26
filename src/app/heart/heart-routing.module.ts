import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HeartComponent } from "./heart.component";
import {ImageDetailComponent} from "./image-detail/image-detail.component";

const routes: Routes = [
    { path: "default", component: HeartComponent },
    { path: "image/:index", component: ImageDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HeartRoutingModule { }
