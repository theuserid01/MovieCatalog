import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { BaseModel } from './models/base.model';
import { AppState } from '../redux/states/app.state';

import {
    ActionMoviesAllGet,
    ActionMoviesDeleteGet,
    ActionMoviesDetailsGet,
    ActionMoviesEditGet
} from '../redux/actions/movies.actions';

const host = 'http://localhost:5000';
const allUrl = host + '/movies/all';
const createUrl = host + '/movies/create';
const deleteUrl = host + '/movies/delete/';
const editUrl = host + '/movies/edit/';

@Injectable()
export class MoviesService {

    constructor(
        private httpClient: HttpClient,
        private store: Store<AppState>
    ) { }

    allGet() {
        return this.httpClient
            .get(allUrl)
            .pipe(map((res: any) => {
                this.store.dispatch(new ActionMoviesAllGet(res));
            }));
    }

    createPost(data: BaseModel) {
        return this.httpClient.post(createUrl, data);
    }

    deleteGet(id: string) {
        return this.httpClient
            .get(deleteUrl + id)
            .pipe(map((res: any) => {
                this.store.dispatch(new ActionMoviesDeleteGet(res));
            }));
    }

    deletePost(id: string, data: BaseModel) {
        return this.httpClient.post(deleteUrl + id, data);
    }

    detailsGet(id: string) {
        return this.httpClient
            .get(allUrl + '/' + id)
            .pipe(map((res: any) => {
                this.store.dispatch(new ActionMoviesDetailsGet(res));
            }));
    }

    editGet(id: string) {
        return this.httpClient
            .get(editUrl + id)
            .pipe(map((res: any) => {
                this.store.dispatch(new ActionMoviesEditGet(res));
            }));
    }

    editPost(id: string, data: BaseModel) {
        return this.httpClient.post(editUrl + id, data);
    }
}
