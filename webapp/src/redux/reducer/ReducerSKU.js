import { ADD_SKU, DELETED_SKU, EDIT_SKU, GET_LIST_SKU } from "../const/TypeSKU"

const initialState = {
    ListSKU : []
}

export default (state = initialState, action) => {
    switch (action.type) {

    case ADD_SKU:

        return { ...state }
    
    case EDIT_SKU:

        return {...state }
    case DELETED_SKU:

        return {...state }
    case GET_LIST_SKU:

        return {...state }

    default:
        return state
    }
}
