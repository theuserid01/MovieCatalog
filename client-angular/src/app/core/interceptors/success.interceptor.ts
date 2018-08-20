import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../auth.service';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router,
        private tostrService: ToastrService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.authToken) {
            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${user.authToken}`
                }
            });
        }

        return next.handle(req)
            .pipe(tap((res: any) => {
                const isGet = req.method.toUpperCase() === 'GET';
                const success = res instanceof HttpResponse && res.body.success;
                if (isGet || !success) {
                    return;
                }

                if (res.body.data && (res.body.token || res.body.data.authToken)) {
                    this.setItemsToLocalStorage(res.body.data);
                }

                if (!res.url.endsWith('signin')) {
                    this.tostrService.success(res.body.message, 'Success!');
                }

                if (this.authService.isAdmin && res.url.includes('users')) {
                    this.router.navigate(['/users/all']);
                } else {
                    this.router.navigate(['/']);
                }
            }));
    }

    private setItemsToLocalStorage(data) {
        localStorage.setItem(
            'user', JSON.stringify({
                '_id': data._id,
                'isAdmin': data.roles && data.roles.includes('Administrator'),
                'authToken': data.authToken,
                'username': data.username
            })
        );
    }
}
