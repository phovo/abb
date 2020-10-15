import { CREATE_SKU, CREATE_SKU_ERROR, DELETE_SKU_ERROR, FETECHED_ALL_SKU, FETECHED_ALL_SKU_ERROR } from "../_const/actions"
const initialState = {
    sku: [],
    searchText: '',
    page: 1,
    totalPages: 1,
    totalElements: 1,
    size: 10,
    isError: false,
    messageError: '',
    messageSuccess: ''
};


export function sku(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_SKU:
            return {
                ...state,
                sku: action.sku,
                page: action.page,
                totalPage: action.totalPage,
                size: action.size,
                searchText: action.searchText,
                isError: false
            };
        case FETECHED_ALL_SKU_ERROR:
            return {
                ...state,
                isError: true,
                messageError: 'Cannot get data SKU from server'
            };
        case DELETE_SKU_ERROR:
            return {
                ...state,
                isError: true,
                messageError: 'Cannot delete data SKU'
            };
        case CREATE_SKU:
            return {
                ...state,
                messageSucess: 'Create data SKU is success'
            };
        case CREATE_SKU_ERROR:
            return {
                ...state,
                isError : true,
                messageError: 'Cannot create data SKU'
            };
        default:
            return {...state, isError: false}
    }
}