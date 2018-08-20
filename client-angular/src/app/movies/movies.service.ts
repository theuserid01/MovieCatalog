import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AllModel } from './models/all.model';
import { MovieModel } from './models/movie.model';

const host = 'http://localhost:5000';
const allUrl = host + '/movies/all';
const createUrl = host + '/movies/create';
const editUrl = host + '/movies/edit/';
const deleteUrl = host + '/movies/delete/';

@Injectable()
export class MoviesService {

    constructor(
        private httpClient: HttpClient
    ) { }

    allGet() {
        return this.httpClient.get<AllModel>(allUrl);
    }

    createPost(data: MovieModel) {
        return this.httpClient.post(createUrl, data);
    }

    editGet(id: string) {
        return this.httpClient.get<MovieModel>(editUrl + id);
    }

    editPost(id: string, data: MovieModel) {
        return this.httpClient.post(editUrl + id, data);
    }

    deleteGet(id: string) {
        return this.httpClient.get(deleteUrl + id);
    }

    deletePost(id: string, data: MovieModel) {
        return this.httpClient.post(deleteUrl + id, data);
    }
}
