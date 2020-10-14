import { DELETE_PRODUCT_ERROR, FETECHED_ALL_PRODUCT, FETECHED_ALL_PRODUCT_ERROR, DELETED_PRODUCT, 
    SAVE_PRODUCT_SUCCESS, SAVE_PRODUCT_FAIL } from "../_const/actions"
import { DELETED_PRODUCT_FAIL_MESSAGE, FETCH_ALL_PRODUCT_FAIL, SAVE_PRODUCT_SUCCESS_MESSAGE, SAVE_PRODUCT_FAIL_MESSAGE } from "../_const/message"

const initialState = {
    product: [],
    searchText: '',
    page: 1,
    totalPage: 1,
    totalItems: 1,
    size: 10,
    isError: false,
    messageError: '',
    isDelete: false,
    isSuccess: false,
    messageSuccess: ''
};


export function product(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_PRODUCT:
            return {
                ...state,
                product: action.product,
                page: action.page,
                totalPage: action.totalPage,
                size: action.size,
                searchText: action.searchText,
                isError: false,
                isDelete: false,
                isSuccess: false
            };
        case FETECHED_ALL_PRODUCT_ERROR:
            return {
                ...state,
                isError: true,
                messageError: FETCH_ALL_PRODUCT_FAIL,
                isDelete: false,
                isSuccess: false
            };
        case DELETE_PRODUCT_ERROR:
            return {
                ...state,
                isError: true,
                messageError: DELETED_PRODUCT_FAIL_MESSAGE,
                isDelete: false,
                isSuccess: false
            };
        case DELETED_PRODUCT:
            return {
                ...state,
                isDelete: true,
                isSuccess: false
            }
        case SAVE_PRODUCT_SUCCESS:
            return {
                ...state,
                isDelete: true,
                isSuccess: true,
                messageSuccess: SAVE_PRODUCT_SUCCESS_MESSAGE
            }
        case SAVE_PRODUCT_FAIL:
            return {
                ...state,
                isSuccess: false,
                isError: true,
                messageError: SAVE_PRODUCT_FAIL_MESSAGE
            }
        default:
            return {...state, isError: false, isDelete: false}
    }
}