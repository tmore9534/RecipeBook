import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html',
    styleUrls:['./auth.component.css',] 
})
export class AuthComponent {
    isLoginMode:boolean = true;
    isLoading:boolean = false;
    error:string=null;
    
    authObs:Observable<AuthResponseData>;

    constructor(private authService:AuthService, private router:Router){}

    onSwitchMode(){ 
        this.isLoginMode=!this.isLoginMode;
    }

    onSubmit(form:NgForm){
        if(!form.valid){
            return;
        }

        this.isLoading = true;
        if(this.isLoginMode){
            this.authObs = this.authService.logIn(form.value.email, form.value.password);
        }    
        else{
            this.authObs = this.authService.signUp(form.value.email, form.value.password);
        }

        this.authObs.subscribe({
                next: (response)=>{
                    console.log(response);
                    this.isLoading = false;
                    this.router.navigate(['./recipes'])
                },

                error: (errorMessage)=>{
                    console.log(errorMessage);
                    this.isLoading = false;
                    this.error = errorMessage;
                }
            })
    
        form.reset()
    } 
}
