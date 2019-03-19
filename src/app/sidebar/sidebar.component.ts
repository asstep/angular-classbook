import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../authorization.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
    isAuth;
    isShowSidebar:boolean=false;

    constructor(private authorizationService: AuthorizationService) {
    }

    showSidebar(){
        this.isShowSidebar = !this.isShowSidebar;
    }
    ngOnInit() {
        (localStorage.getItem('token'))?this.isAuth=true:this.isAuth=false;
    }

}
