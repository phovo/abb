import React, { Component } from 'react';
import axios from 'axios';
import {domain,accessToken} from '../settings/config'

class userSevice extends Component {
    UserLogin = (user)=>{
        return axios ({
            url : `${domain}/login`,
            method: 'POST',
            data : user
        })
    }
}

export const UserSevice = new userSevice();
