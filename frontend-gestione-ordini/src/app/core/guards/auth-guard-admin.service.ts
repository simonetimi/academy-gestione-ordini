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
export class AuthGuardAdminService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log("auth-guard entered")
    if (this.authService.isAuthenticated && !this.authService.isTokenExpired && this.authService.userRole === "ROLE_ADMIN") {
      console.log(this.authService?.userRole);
      return true;
     } else {
      console.log("auth-guard else entered")
      return this.router.navigateByUrl("/auth/login");
    }
    }

}
