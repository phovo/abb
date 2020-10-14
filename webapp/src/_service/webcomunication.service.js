import axios from 'axios';
import config from '../_config/config';
import { userService } from './user.service';

export const webComunication = {
    get,
    post,
    put,
    deleteDetail
};

function get(apiEndpoint, payload){
    return axios.get(config.baseUrl+apiEndpoint, getOptions(payload)).then((response)=>{
        return response;
    }).catch((err)=>{
        console.log("Error in response");
        console.log(err);
        if(err.status === 401) {
            userService.logout();
        }
    })
}

function post(apiEndpoint, payload){
    return axios.post(config.baseUrl+apiEndpoint, payload, getOptions()).then((response)=>{
        return response;
    }).catch((err)=>{
        console.log(err);
        if(err.status === 401) {
            userService.logout();
        }
    })
}

function put(apiEndpoint, payload){
    return axios.put(config.baseUrl+apiEndpoint, payload, getOptions()).then((response)=>{
        return response;
    }).catch((err)=>{
        console.log(err);
        if(err.status === 401) {
            userService.logout();
        }
    })
}

function deleteDetail(apiEndpoint){
    return axios.delete(config.baseUrl+apiEndpoint, getOptions()).then((response)=>{
        return response;
    }).catch((err)=>{
        console.log(err);
        if(err.status === 401) {
            userService.logout();
        }
    })
}

function getOptions(payload){
    let options = {}; 
    if(localStorage.getItem('token')){
        // options.headers = { 'x-access-token': localStorage.getItem('token') };
        options.headers = { 'Authorization': localStorage.getItem('token') };
        
    }
    options.params = payload ? payload.params : {};
    return options;
}