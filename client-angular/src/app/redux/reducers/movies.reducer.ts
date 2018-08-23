import * as MoviesActions from '../actions/movies.actions';
import { MoviesState } from '../states/movies.state';

const initialState: MoviesState = {
    allGet: null,
    createPost: null,
    deleteGet: null,
    deletePost: null,
    detailsGet: null,
    editGet: null,
    editPost: null
};

export function moviesReducer(
    state: MoviesState = initialState,
    action: MoviesActions.Types,
) {
    switch (action.type) {
        case MoviesActions.MOVIES_ALL_GET:
            return {
                ...state,
                allGet: action.payload
            };
        case MoviesActions.MOVIES_CREATE_POST:
            return {
                ...state,
                createPost: action.payload
            };
        case MoviesActions.MOVIES_DELETE_GET:
            return {
                ...state,
                deleteGet: action.payload
            };
        case MoviesActions.MOVIES_DELETE_POST:
            return {
                ...state,
                deletePost: action.payload
            };
        case MoviesActions.MOVIES_DETAILS_GET:
            return {
                ...state,
                detailsGet: action.payload
            };
        case MoviesActions.MOVIES_EDIT_GET:
            return {
                ...state,
                editGet: action.payload
            };
        case MoviesActions.MOVIES_EDIT_POST:
            return {
                ...state,
                editPost: action.payload
            };
        default:
            return state;
    }
}
