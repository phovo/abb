import { CREATE_SKU, CREATE_SKU_ERROR, DELETE_SKU_ERROR, EDIT_SKU, FETECHED_ALL_SKU, FETECHED_ALL_SKU_ERROR,
    FETECHED_SKU_DETAILS, CHANGE_SKU_PROPS, CHANGE_PARAM_SEARCH } from "../_const/actions"
const initialState = {
    sku: [],
    searchText: '',
    page: 1,
    totalPages: 1,
    totalElements: 1,
    size: 10,
    isError: false,
    messageError: '',
    messageSuccess: '',
    skuEdit: {
        name: '',
        Status: false,
        description: ''
    }
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
        case FETECHED_SKU_DETAILS:
            return {
                ...state,
                isError: false,
                skuEdit : {
                    name: action.name,
                    Status: action.Status,
                    description: action.description
                }
            }
        case CHANGE_SKU_PROPS: 
            return {
                ...state,
                isError: false,
                skuEdit : {
                    name: state.skuEdit.name,
                    Status: state.skuEdit.Status,
                    description: state.skuEdit.description,
                    [action.props]: action.value
                }
            }
        case CHANGE_PARAM_SEARCH: 
            return {
                ...state,
                isError: false,
                searchText: action.searchText
            }
        default:
            return {...state, isError: false}
    }
}