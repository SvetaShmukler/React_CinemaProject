//Updating of global states:
function reducer(state = { user:{}, permissions:[], refresh: false , refreshMovies: false, editMovie:'', editUser:'', editMember:''}, action) {
    switch (action.type) {
        case "Save User":
            return ({ ...state, user: action.payload })
        case "Save Permissions":
            return ({ ...state, permissions: action.payload })
        case "Refresh movies":
            return ({ ...state, refreshMovies: !state.refreshMovies })
        case "Save movie for edit movie":
            return ({ ...state, editMovie: action.payload })
        case "REFRESH":
            return ({ ...state, refresh: !state.refresh })
        case "Edit user and save":
            return ({ ...state, editUser: action.payload })
        case "Save member for edit it":
            return ({ ...state, editMember: action.payload })
    }     
}
export default reducer