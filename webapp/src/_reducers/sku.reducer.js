import { DELETE_SKU_ERROR, FETECHED_ALL_SKU, FETECHED_ALL_SKU_ERROR, DELETED_SKU } from "../_const/actions"
const initialState = {
    sku: [],
    searchText: '',
    page: 1,
    totalPage: 1,
    totalItems: 1,
    size: 10,
    isError: false,
    messageError: '',
    isDelete: false
};


export function sku(state = initialState, action) {
    console.log('====================================');
    console.log('action.type', action.type);
    console.log('====================================');
    switch (action.type) {
        case FETECHED_ALL_SKU:
            return {
                ...state,
                sku: action.sku,
                page: action.page,
                totalPage: action.totalPage,
                size: action.size,
                searchText: action.searchText,
                isError: false,
                isDelete: false
            };
        case FETECHED_ALL_SKU_ERROR:
            return {
                ...state,
                isError: true,
                messageError: 'Cannot get data SKU from server',
                isDelete: false
            };
        case DELETE_SKU_ERROR:
            return {
                ...state,
                isError: true,
                messageError: 'Cannot delete data SKU',
                isDelete: false
            };
        case DELETED_SKU:
            return {
                ...state,
                isDelete: true
            }
        default:
            return {...state, isError: false, isDelete: false}
    }
}