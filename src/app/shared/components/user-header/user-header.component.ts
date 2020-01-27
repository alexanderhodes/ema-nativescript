import {Component, OnInit} from "@angular/core";

@Component({
    selector: "UserHeader",
    templateUrl: "./user-header.component.html"
})
export class UserHeaderComponent implements OnInit {

    accountImage: string;

    constructor() {
        this.accountImage = '~/images/account/photo-of-man-holding-phone-3475632.jpg';
    }

    ngOnInit(): void {

    }



}
