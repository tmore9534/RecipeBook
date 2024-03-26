import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core"
import { DataStoreService } from "src/shared/datastore.service";
import { AuthService } from "../Auth/auth.service";
import { Subscription } from "rxjs";
@Component({
    selector:"<app-header>",
    templateUrl:"./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated=false;
    userSubscription:Subscription;
    
    constructor(private dataStoreService:DataStoreService, private authService:AuthService){}

    ngOnInit(): void {
        this.userSubscription = this.authService.user.subscribe((user)=>{
            this.isAuthenticated = !!user;
        })
    }

    onSaveData(){
        this.dataStoreService.saveData();
    }

    onFetchData(){
        this.dataStoreService.fetchData().subscribe();
    }

    onLogOut(){
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
}