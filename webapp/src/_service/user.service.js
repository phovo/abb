import {webComunication}  from '../_service/webcomunication.service';
import { history } from '../_helpers/history';
import {LOGIN_API} from '../_const/apis';
import {LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_FAIL} from '../_const/actions';

export const userService = {
    login,
    logout
};

function login(username, password){
    return dispatch => {
        let payload = {
            Username: username,
            Password: password
        }
        webComunication.post(LOGIN_API, payload)
        .then((response)=>{
            if (response.data) {
                localStorage.setItem('token', response.data.data);
                localStorage.setItem('auth', 'Sang');
                dispatch(setUserDetails(response.data));
                history.push('/product');
            }
        }).catch((error) => {
            dispatch(loginFail());
        })
    };
}

function logout(){
    return dispatch => {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        dispatch(logoutUser());
        history.push('/login');
    }
}

export function setUserDetails(user){
    return{
        type: LOGIN_SUCCESS,
        auth: user.auth,
        token: user.token
    }
}

export function logoutUser(){
    return{
        type: LOGOUT_SUCCESS,
        auth: false,
        token: ''
    }
}

export function loginFail(){
    return{
        type: LOGIN_FAIL,
        auth: false,
        token: ''
    }
}