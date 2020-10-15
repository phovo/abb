import {webComunication}  from '../_service/webcomunication.service';
import {SKU_API} from '../_const/apis';
import {FETECHED_ALL_SKU,FETECHED_ALL_SKU_ERROR,DELETE_SKU_ERROR, DELETED_SKU, CREATE_SKU, CREATE_SKU_ERROR, EDIT_SKU,
    FETECHED_SKU_DETAILS_ERROR, FETECHED_SKU_DETAILS, CHANGE_SKU_PROPS } from '../_const/actions';
import { history } from '../_helpers/history';

export const skuAction = {
    getSKU,
    deleteSKUById,
    createSKU,
    updateSKU,
    getSkuDetails,
    handleChange,
    updateSKUDetails
};

function getSKU(page, text){
    return dispatch => {
        webComunication.get(SKU_API, {params: {page: page, searchText: text}})
        .then((response)=>{
            dispatch(changeSKUsList(response.data));
        }).catch((err)=>{
            dispatch(getSKUListFail());
        })
    };
}


function deleteSKUById(id, page, text){
    return dispatch => {
        webComunication.deleteDetail(`${SKU_API}/${id}`)
        .then((response)=>{
            dispatch(deleteSKUsDetails());
            dispatch(skuAction.getSKU(page, text));
        }).catch((err) => {
            dispatch(deleteSKUFail());
        })
    };
}

function getSkuDetails(id) {
    return dispatch => {
        webComunication.get(`${SKU_API}/${id}`)
        .then((response)=>{
            dispatch(getSKUsDetailsSucess(response.data));
        }).catch((err) => {
            history.push('/sku');
        })
    };
}

function handleChange(name, value) {
    return dispatch => { 
        dispatch(setSkuProps(name, value));
    }
}

function updateSKUDetails(sku) {
    return dispatch => {
        webComunication.put(`${SKU_API}/${sku.id}`, sku)
        .then((response)=>{
            console.log(response.data);
            history.push('/sku');
        }).catch((err) => {
            dispatch(saveSKUFAIL());
        })
    };
}

export function changeSKUsList(sku){
    return{
        type: FETECHED_ALL_SKU,
        sku: sku.data.items,
        page: sku.data.page,
        totalPage: sku.data.totalPage,
        size: sku.data.size,
        searchText: sku.data.searchText
    }
}
//action createSKU
export function createSKU (sku){
    return dispatch =>{
        webComunication.post(SKU_API,sku)
        .then((response)=>{
            history.push('/sku');
        }).catch((err)=>{
            dispatch(saveSKUFAIL());
        })
    }
}

//action editSKU
export function updateSKU (skuID,page,text){
    return dispatch =>{
        webComunication.put(SKU_API,skuID)
        .then((response)=>{
            dispatch(editSKU(response.data));
            dispatch(getSKU(page,text));
        }).catch((err)=>{
            alert('Update SKU Failed');
        })
    }
}

//

export function editSKU(){
    return{
        type: EDIT_SKU
    }
}
export function saveSKU (){
    return {
        type:CREATE_SKU
    }
}

export function saveSKUFAIL(){
    return {
        type:CREATE_SKU_ERROR
    }
}

export function deleteSKUsDetails(){
    return{
        type: DELETED_SKU
    }
}

export function getSKUListFail(){
    return{
        type: FETECHED_ALL_SKU_ERROR
    }
}

export function deleteSKUFail(){
    return{
        type: DELETE_SKU_ERROR
    }
}

export function getSKUsDetailsSucess(action) {
    return {
        type: FETECHED_SKU_DETAILS,
        name: action.data.name,
        id: action.data.id,
        description: action.data.description,
        Status: action.data.Status
    }
}

export function getSKUsDetailsFail() {
    return {
        type: FETECHED_SKU_DETAILS_ERROR
    }
}

export function setSkuProps(name, value) {
    console.log('====================================');
    console.log('name', name, value);
    console.log('====================================');
    return {
        type: CHANGE_SKU_PROPS,
        props: name,
        value: value
    }
}