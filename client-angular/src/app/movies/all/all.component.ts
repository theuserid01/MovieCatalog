import { Component, Injector, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AbstractComponent } from '../shared/abstract.component';
import { AllModel } from '../models/all.model';
import { AuthService } from '../../core/auth.service';
import { DetailsModel } from '../models/details.model';
import { animations } from './animations';
import { AppState } from '../../redux/states/app.state';

@Component({
    selector: 'app-all',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.css'],
    animations: animations
})
export class AllComponent extends AbstractComponent implements OnInit {
    public filter: string;
    public movies: AllModel;
    public movieDetails: DetailsModel;
    public movieDetailsId: string;
    public state: string;

    constructor(
        private authService: AuthService,
        private store: Store<AppState>,
        injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getDataAll();
    }

    getDataAll() {
        this.state = 'init';
        this.moviesService.allGet()
            .subscribe(
                () => {
                    this.store
                        .pipe(select(state => state.movies.allGet))
                        .subscribe(
                            (res: any) => {
                                this.movies = res.data.movies;
                                this.movieDetails = res.data.movieDetails;
                                this.movieDetailsId = this.movieDetails._id;
                                this.location.go('movies/all/' + this.movieDetailsId);
                            },
                            (err: any) => {
                                console.log(err);
                            }
                        );
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }

    getDataMovieDetails(id) {
        this.state = 'init';
        this.moviesService.detailsGet(id)
            .subscribe(
                () => {
                    this.store
                        .pipe(select(state => state.movies.detailsGet))
                        .subscribe(
                            (res: any) => {
                                this.movieDetails = res.data.movieDetails;
                            },
                            (err: any) => {
                                console.log(err);
                            }
                        );
                    this.state = 'fadeIn';
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
