import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.authService.isAdmin()) {
            return true;
        }

        this.router.navigate(['/users/signin']);
        return false;
    }
}
