import { Location } from '@angular/common';
import { Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MoviesService } from '../movies.service';

export class AbstractComponent {
    protected activatedRoute: ActivatedRoute;
    protected location: Location;
    protected router: Router;
    protected moviesService: MoviesService;

    constructor(injector: Injector) {
        this.activatedRoute = injector.get(ActivatedRoute);
        this.location = injector.get(Location);
        this.router = injector.get(Router);
        this.moviesService = injector.get(MoviesService);
    }
}
