import { ADD_SKU, DELETED_SKU, EDIT_SKU, GET_LIST_SKU } from "../const/TypeSKU";

export const addSKU = (action) => ({
    type: ADD_SKU,
    action
})

export const editSKU = (action) => ({
    type: EDIT_SKU,
    action
})

export const deletedSKU = (action) => ({
    type: DELETED_SKU,
    action
})

export const getListSKU = (action) => ({
    type: GET_LIST_SKU,
    action
})

