import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UsersService } from "../services/users.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const userService = inject(UsersService);
    const router = inject(Router);
    userService.isAuthenticated$.asObservable().subscribe((isAuthenticated: boolean) => {
        return isAuthenticated ? true : router.navigate(['/login'])
    });
    return true;
}