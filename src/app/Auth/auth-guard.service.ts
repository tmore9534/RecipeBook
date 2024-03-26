import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthGuardService {

  constructor(private router: Router, private authService:AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean| UrlTree| Observable<UrlTree|boolean> | Promise <UrlTree|boolean> {
      return this.authService.user.pipe(take(1), map(user =>{
        const isAuth = !!user;
        if(isAuth){
            return true;
        }
        return this.router.createUrlTree(['/auth']);
      }))
  }

}

 export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree| Observable<UrlTree|boolean> | Promise <UrlTree|boolean> => {
  return inject(AuthGuardService).canActivate(next, state);
}

