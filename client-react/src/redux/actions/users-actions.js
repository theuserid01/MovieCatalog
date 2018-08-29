const types = {
    USERS_ALL_GET: 'USERS_All_GET',
    USERS_DELETE_GET: 'USERS_DELETE_GET',
    USERS_DELETE_POST: 'USERS_DELETE_POST',
    USERS_EDIT_DETAILS_GET: 'USERS_EDIT_DETAILS_GET',
    USERS_EDIT_DETAILS_POST: 'USERS_EDIT_DETAILS_POST',
    USERS_EDIT_PASSWORD_POST: 'USERS_EDIT_PASSWORD_POST',
    USERS_EDIT_ROLES_GET: 'USERS_EDIT_ROLES_GET',
    USERS_EDIT_ROLES_POST: 'USERS_EDIT_ROLES_POST',
    USERS_SIGN_IN: 'USERS_SIGN_IN',
    USERS_SIGN_OUT: 'USERS_SIGN_OUT'
}

const creators = {
    allGet: (payload) => ({
        type: types.USERS_ALL_GET,
        payload: payload
    }),
    deleteGet: (payload) => ({
        type: types.USERS_DELETE_GET,
        payload: payload
    }),
    deletePost: (payload) => ({
        type: types.USERS_DELETE_POST,
        payload: payload
    }),
    editDetailsGet: (payload) => ({
        type: types.USERS_EDIT_DETAILS_GET,
        payload: payload
    }),
    editDetailsPost: (payload) => ({
        type: types.USERS_EDIT_DETAILS_POST,
        payload: payload
    }),
    editPasswordPost: (payload) => ({
        type: types.USERS_EDIT_PASSWORD_POST,
        payload: payload
    }),
    editRolesGet: (payload) => ({
        type: types.USERS_EDIT_ROLES_GET,
        payload: payload
    }),
    editRolesPost: (payload) => ({
        type: types.USERS_EDIT_ROLES_POST,
        payload: payload
    }),
    signIn: (payload) => ({
        type: types.USERS_SIGN_IN,
        payload: payload
    }),
    signOut: (payload) => ({
        type: types.USERS_SIGN_OUT,
        payload: payload
    })
}

const usersActions = {
    creators,
    types
}

export default usersActions
