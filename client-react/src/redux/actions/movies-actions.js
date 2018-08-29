const types = {
    MOVIES_ALL_GET: 'MOVIES_All_GET',
    MOVIES_CREATE_POST: 'MOVIES_CREATE_POST',
    MOVIES_DELETE_GET: 'MOVIES_DELETE_GET',
    MOVIES_DELETE_POST: 'MOVIES_DELETE_POST',
    MOVIES_DETAILS_GET: 'MOVIES_DETAILS_GET',
    MOVIES_EDIT_GET: 'MOVIES_EDIT_GET',
    MOVIES_EDIT_POST: 'MOVIES_EDIT_POST',
}

const creators = {
    allGet: (payload) => ({
        type: types.MOVIES_ALL_GET,
        payload: payload
    }),
    createPost: (payload) => ({
        type: types.MOVIES_CREATE_POST,
        payload: payload
    }),
    deleteGet: (payload) => ({
        type: types.MOVIES_DELETE_GET,
        payload: payload
    }),
    deletePost: (payload) => ({
        type: types.MOVIES_DELETE_POST,
        payload: payload
    }),
    detailsGet: (payload) => ({
        type: types.MOVIES_DETAILS_GET,
        payload: payload
    }),
    editGet: (payload) => ({
        type: types.MOVIES_EDIT_GET,
        payload: payload
    }),
    editPost: (payload) => ({
        type: types.MOVIES_EDIT_POST,
        payload: payload
    })
}

const moviesActions = {
    creators,
    types
}

export default moviesActions
