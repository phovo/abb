const initialState = {
    userLogin:[]
}

const UserReducer = (state = initialState,action) => {
    switch (action.type) {

    case 'LOGIN_USER':
        state.userLogin = action.userLogin
        return { ...state}

    default:
        return state
    }
}
export default UserReducer
