import { Component, Injector, OnInit } from '@angular/core';

import { AbstractComponent } from '../shared/abstract.component';
import { AllModel } from '../models/all.model';

import { AuthService } from '../../core/auth.service';
import { DetailsModel } from '../models/details.model';

@Component({
    selector: 'app-all',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.css']
})
export class AllComponent extends AbstractComponent implements OnInit {
    public filter: string;
    public movies: AllModel;
    public movieDetails: DetailsModel;
    public movieDetailsId: string;

    constructor(
        public authService: AuthService,
        public injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getDataAll();
    }

    getDataAll() {
        this.moviesService.allGet()
            .subscribe(
                (res: any) => {
                    if (!res.success) {
                        console.log(res.message);
                        return;
                    }
                    this.movies = res.data.movies;
                    this.movieDetails = res.data.movieDetails;
                    this.movieDetailsId = this.movieDetails._id;
                    this.location.go('movies/all/' + this.movieDetailsId);
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }

    getDataMovieDetails(id) {
        this.moviesService.detailsGet(id)
            .subscribe(
                (res: any) => {
                    if (!res.success) {
                        console.log(res.message);
                        return;
                    }
                    this.movieDetails = res.data.movieDetails;
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }

    onClickArticle(id) {
        if (this.movieDetailsId === id) {
            return;
        }

        this.movieDetailsId = id;
        this.getDataMovieDetails(id);
        this.location.go('movies/all/' + id);
    }
}
