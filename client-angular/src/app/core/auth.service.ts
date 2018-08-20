import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    constructor(
        private router: Router
    ) { }

    get user() {
        return JSON.parse(localStorage.getItem('user'));
    }

    public getUserId(): string {
        if (this.user) {
            return this.user._id;
        }

        return null;
    }

    public getUsername(): string {
        if (this.user) {
            return this.user.username;
        }

        return null;
    }

    public isAdmin(): boolean {
        if (this.user) {
            return this.user.isAdmin;
        }

        return false;
    }

    public isAuthenticated(): boolean {
        return this.user !== null;
    }

    public logout(): void {
        localStorage.clear();
    }

    public logoutAndRedirect(): void {
        localStorage.clear();
        this.router.navigate(['/']);
    }
}
