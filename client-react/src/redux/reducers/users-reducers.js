import usersActions from '../actions/users-actions'

const initialState = {
    allGet: {},
    deleteGet: {},
    deletePost: {},
    editDetailsGet: {},
    editDetailsPost: {},
    editPasswordPost: {},
    editRolesGet: {},
    editRolesPost: {},
    signIn: {},
    signOut: {}
}

const usersReducers = (state = initialState, action) => {
    switch (action.type) {
        case usersActions.types.USERS_ALL_GET:
            return {
                ...state,
                allGet: action.payload
            }
        case usersActions.types.USERS_DELETE_GET:
            return {
                ...state,
                deleteGet: action.payload
            }
        case usersActions.types.USERS_DELETE_POST:
            return {
                ...state,
                deletePost: action.payload
            }
        case usersActions.types.USERS_EDIT_DETAILS_GET:
            return {
                ...state,
                editDetailsGet: action.payload
            }
        case usersActions.types.USERS_EDIT_DETAILS_POST:
            return {
                ...state,
                editDetailsPost: action.payload
            }
        case usersActions.types.USERS_EDIT_PASSWORD_POST:
            return {
                ...state,
                editPasswordPost: action.payload
            }
        case usersActions.types.USERS_EDIT_ROLES_GET:
            return {
                ...state,
                editRolesGet: action.payload
            }
        case usersActions.types.USERS_EDIT_ROLES_POST:
            return {
                ...state,
                editRolesPost: action.payload
            }
        case usersActions.types.USERS_SIGN_IN:
            setItemsToLocalStorage(action.payload)
            return {
                ...state,
                signIn: action.payload
            }
        case usersActions.types.USERS_SIGN_OUT:
            localStorage.clear()
            return {
                ...state,
                signIn: initialState.signIn
            }
        default:
            return state
    }
}

export default usersReducers

function setItemsToLocalStorage(data) {
    localStorage.setItem(
        'user', JSON.stringify({
            '_id': data._id,
            'authToken': data.authToken,
            'email': data.email,
            'isAdmin': data.isAdmin,
            'isAuthenticated': true,
            'roles': data.roles,
            'username': data.username
        })
    )
}
