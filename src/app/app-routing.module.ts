import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NSEmptyOutletComponent } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/(homeTab:home/default//plusTab:plus/default//searchTab:search/default//heartTab:heart/default//userTab:user/default)",
        pathMatch: "full"
    },

    {
        path: "home",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule),
        outlet: "homeTab"
    },
    {
        path: "plus",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/plus/plus.module").then((m) => m.PlusModule),
        outlet: "plusTab"
    },
    {
        path: "search",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule),
        outlet: "searchTab"
    },
    {
        path: "heart",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/heart/heart.module").then((m) => m.HeartModule),
        outlet: "heartTab"
    },
    {
        path: "user",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/user/user.module").then((m) => m.UserModule),
        outlet: "userTab"
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
