import {webComunication}  from '../_service/webcomunication.service';
import {PRODUCT_API} from '../_const/apis';
import {FETECHED_ALL_PRODUCT,FETECHED_ALL_PRODUCT_ERROR,DELETE_PRODUCT_ERROR, DELETED_PRODUCT,SAVE_PRODUCT_SUCCESS, SAVE_PRODUCT_FAIL } from '../_const/actions';

export const productAction = {
    getProduct,
    deleteProductById,
    createProduct
};

function getProduct(page, text){
    return dispatch => {
        webComunication.get(PRODUCT_API, {params: {page: page, searchText: text}})
        .then((response)=>{
            dispatch(changeProductsList(response.data));
        }).catch((err)=>{
            dispatch(getProductListFail());
        })
    };
}

function getProductById(id){
    return dispatch => {
        webComunication.get(PRODUCT_API, {params: {id}})
        .then((response)=>{
            dispatch(changeProductsList(response.data));
        }).catch((err)=>{
            dispatch(getProductListFail());
        })
    };
}

function createProduct(product) {
    return dispatch => {
        webComunication.post(PRODUCT_API, product)
        .then((response)=>{
            dispatch(saveProductSucess(response.data));
        }).catch((err)=>{
            dispatch(saveProductFail());
        })
    };
}

function deleteProductById(id,page,text){
    return dispatch => {
        webComunication.deleteDetail(`${PRODUCT_API}/${id}`)
        .then((response)=>{
            dispatch(deleteProductsDetails());
            console.log(deleteProductsDetails());
            dispatch(productAction.getProduct(page, text));
        }).catch((err) => {
            dispatch(deleteProductFail());
        })
    };
}

export function changeProductsList(product){
    return{
        type: FETECHED_ALL_PRODUCT,
        product: product.data.items,
        page: product.data.page,
        totalPage: product.data.totalPage,
        size: product.data.size,
        searchText: product.data.searchText
    }
}


export function deleteProductsDetails(){
    return{
        type: DELETED_PRODUCT
    }
}

export function getProductListFail(){
    return{
        type: FETECHED_ALL_PRODUCT_ERROR
    }
}

export function deleteProductFail(){
    return{
        type: DELETE_PRODUCT_ERROR
    }
}

export function saveProductSucess(){
    return{
        type: SAVE_PRODUCT_SUCCESS
    }
}

export function saveProductFail() {
    return{
        type: SAVE_PRODUCT_FAIL
    }
}