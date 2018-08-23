import { Action } from '@ngrx/store';

export const MOVIES_ALL_GET = '[MOVIES] All GET';
export const MOVIES_CREATE_POST = '[MOVIES] CREATE POST';
export const MOVIES_DELETE_GET = '[MOVIES] DELETE GET';
export const MOVIES_DELETE_POST = '[MOVIES] DELETE POST';
export const MOVIES_DETAILS_GET = '[MOVIES] DEATAILS GET';
export const MOVIES_EDIT_GET = '[MOVIES] EDIT GET';
export const MOVIES_EDIT_POST = '[MOVIES] EDIT POST';

export class ActionMoviesAllGet implements Action {
    type: string = MOVIES_ALL_GET;
    constructor(public payload: any) { }
}

export class ActionMoviesCreatePost implements Action {
    type: string = MOVIES_CREATE_POST;
    constructor(public payload: any) { }
}

export class ActionMoviesDeleteGet implements Action {
    type: string = MOVIES_DELETE_GET;
    constructor(public payload: any) { }
}

export class ActionMoviesDeletePost implements Action {
    type: string = MOVIES_DELETE_POST;
    constructor(public payload: any) { }
}

export class ActionMoviesDetailsGet implements Action {
    type: string = MOVIES_DETAILS_GET;
    constructor(public payload: any) { }
}

export class ActionMoviesEditGet implements Action {
    type: string = MOVIES_EDIT_GET;
    constructor(public payload: any) { }
}

export class ActionMoviesEditPost implements Action {
    type: string = MOVIES_EDIT_POST;
    constructor(public payload: any) { }
}

export type Types = ActionMoviesAllGet
    | ActionMoviesCreatePost
    | ActionMoviesDeleteGet
    | ActionMoviesDeletePost
    | ActionMoviesDetailsGet
    | ActionMoviesEditGet
    | ActionMoviesEditPost;
