import {webComunication}  from '../_service/webcomunication.service';
import {SKU_API} from '../_const/apis';
import {FETECHED_ALL_SKU,FETECHED_ALL_SKU_ERROR,DELETE_SKU_ERROR, DELETED_SKU, CREATE_SKU, CREATE_SKU_ERROR } from '../_const/actions';

export const skuAction = {
    getSKU,
    deleteSKUById,
    createSKU
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
            dispatch(saveSKU(response.data));
        }).catch((err)=>{
            dispatch(saveSKUFAIL());
        })
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