export const domain = 'http://52.77.251.144/';

export const userLogin = 'userLogin';

let token =''

if (localStorage.getItem(userLogin)){
    token = JSON.parse(localStorage.getItem(userLogin)).accessToken
}

export const accessToken = token;