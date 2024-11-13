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
export class AuthGuardServiceRole implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      debugger;
    if (this.authService.userRole === "ROLE_ADMIN") {
      return true;
    } else {
      this.router.navigate(['dashboard','operator']);
      return false;

    }
    }

  // canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
  //   if (this.authService.userRole === "ROLE_ADMIN") {
  //     return true;
  //   } else {
  //     this.router.navigate(['dashboard','operator']);
  //     return false;
  //
  //   }
  //   }
}
