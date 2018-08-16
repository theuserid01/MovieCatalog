import { Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../users.service';

export class AbstractComponent {
    protected activatedRoute: ActivatedRoute;
    protected usersService: UsersService;

    constructor(injector: Injector) {
        this.activatedRoute = injector.get(ActivatedRoute);
        this.usersService = injector.get(UsersService);
    }
}
