import moviesActions from '../actions/movies-actions'

const initialState = {
    allGet: {},
    createPost: {},
    deleteGet: {},
    deletePost: {},
    detailsGet: {},
    editGet: {},
    editPost: {}
}

const moviesReducers = (state = initialState, action) => {
    switch (action.type) {
        case moviesActions.types.MOVIES_ALL_GET:
            return {
                ...state,
                allGet: action.payload
            }
        case moviesActions.types.MOVIES_CREATE_POST:
            return {
                ...state,
                createPost: action.payload
            }
        case moviesActions.types.MOVIES_DELETE_GET:
            return {
                ...state,
                deleteGet: action.payload
            }
        case moviesActions.types.MOVIES_DELETE_POST:
            return {
                ...state,
                deletePost: action.payload
            }
        case moviesActions.types.MOVIES_DETAILS_GET:
            return {
                ...state,
                detailsGet: action.payload
            }
        case moviesActions.types.MOVIES_EDIT_GET:
            return {
                ...state,
                editGet: action.payload
            }
        case moviesActions.types.MOVIES_EDIT_POST:
            return {
                ...state,
                editPost: action.payload
            }
        default:
            return state
    }
}

export default moviesReducers
