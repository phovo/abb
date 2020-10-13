import axios from 'axios'
import {domain,accessToken} from '../settings/config'

import React, { Component } from 'react'

class SkuPageService extends Component {
    AddSKU = (values) =>{
        return axios ({
            url : `${domain}:8080/api/sku`,
            method: "POST",
            data : {values},
            headers : {"Authorization":{accessToken}}
        })
    }

    UpdateSKU = (data) =>{
        return axios ({
            url : `${domain}:8080/api/sku/`,
            method : 'PUT',
            data,
            headers : {"Authorization":{accessToken}}
        })
    }

    DeletedSKU = (skuID) =>{
        return axios ({
            url :`${domain}:8080/api/sku/${skuID}`,
            method :'DELETE',
            headers :{"Authorization":{accessToken}}
        })
    }
}

export const SkuPageService = new SkuPageService();