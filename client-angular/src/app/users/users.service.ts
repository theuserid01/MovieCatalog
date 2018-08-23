import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseModel } from './models/base.model';
import { EditPasswordModel } from './models/edit-password.model';
import { EditRolesModel } from './models/edit-roles.model';
import { SignInModel } from './models/sign-in.model';
import { SignUpModel } from './models/sign-up.model';

const host = 'http://localhost:5000';
const allUrl = host + '/users/all';
const editDetailsUrl = host + '/users/edit/details/';
const editPasswordUrl = host + '/users/edit/password/';
const editRolesUrl = host + '/users/edit/roles/';
const deleteUrl = host + '/users/delete/';
const signInUrl = host + '/users/signin';
const signUpUrl = host + '/users/signup';

@Injectable()
export class UsersService {

    constructor(
        private httpClient: HttpClient
    ) { }

    allGet(query: string) {
        return this.httpClient.get(allUrl + query);
    }

    editDetailsGet(id: string) {
        return this.httpClient.get(editDetailsUrl + id);
    }

    editDetailsPost(id: string, data: BaseModel) {
        return this.httpClient.post(editDetailsUrl + id, data);
    }

    editPasswordPost(id: string, data: EditPasswordModel) {
        return this.httpClient.post(editPasswordUrl + id, data);
    }

    editRolesGet(id: string) {
        return this.httpClient.get(editRolesUrl + id);
    }

    editRolesPost(id: string, data: EditRolesModel) {
        return this.httpClient.post(editRolesUrl + id, data);
    }

    deleteGet(id: string) {
        return this.httpClient.get(deleteUrl + id);
    }

    deletePost(id: string, data: BaseModel) {
        return this.httpClient.post(deleteUrl + id, data);
    }

    signIn(data: SignInModel) {
        return this.httpClient.post(signInUrl, data);
    }

    signUp(data: SignUpModel) {
        return this.httpClient.post(signUpUrl, data);
    }
}
