import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken:string,
    email:string,
    refereshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}

@Injectable({providedIn:'root'})
export class AuthService{
    private tokenExpirationTimer:any;
    user=new BehaviorSubject<User>(null);

    constructor(private http:HttpClient, private router:Router){}

    signUp(email:string,password:string){
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBemQB55HXooH7Y4TvhA34sqRZJMj-7XOw",{
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe(catchError(this.errorHandler),
         tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))

    )}

    logIn(email:string, password:string){
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBemQB55HXooH7Y4TvhA34sqRZJMj-7XOw", {
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe(catchError(this.errorHandler),
        tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
        
    )}

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogIn(){
        const userData :{
            email:string,
            id:string,
            _token:string,
            _tokenexpirationDate:Date
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData){
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenexpirationDate));
        this.user.next(loadedUser);
        
        const expirationDuration = new Date(userData._tokenexpirationDate).getTime() - new Date().getTime();  
        this.autoLogOut(expirationDuration)
    }

    autoLogOut(expirationDuration:number){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout();
        }, expirationDuration);
    }


    private errorHandler(errorRes:HttpErrorResponse){
            console.log(errorRes);
            let errorMessage = "An unknown Error Occurred!";
            if(!errorRes.error || !errorRes.error.error){
                return throwError(() => errorMessage)
            }
            switch(errorRes.error.error.message){  
                case 'EMAIL_EXISTS':
                    errorMessage = "This email already exists!";
                    break;
                case 'INVALID_LOGIN_CREDENTIALS':
                    errorMessage = "Username or Password is not correct!"
                    break;
            }
            return throwError(() => errorMessage)
        }

    private handleAuthentication(email:string, id:string, token:string, expiresIn:number){
        const expirationDate = new Date(new Date().getTime()+ expiresIn*1000)
        const user = new User(email,id,token,expirationDate);
        this.user.next(user);
        this.autoLogOut(expiresIn*1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

}

   
