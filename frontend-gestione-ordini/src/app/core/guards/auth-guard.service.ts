import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isAuthenticated && !this.authService.isTokenExpired) {
      // if (this.authService.userRole == "ROLE_ADMIN") {
      //   return true;
      // }
      // if (this.authService.userRole == "ROLE_OPERATOR") {
      //   return this.router.navigateByUrl("/dashboard/operator");
      // }
      console.log(this.authService.userRole);
      return true;
    } else {
      return this.router.navigateByUrl("/auth/login");
    }
    }

}
