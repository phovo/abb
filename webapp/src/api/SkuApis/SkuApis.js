import axiosClient from "../axiosClient";

const PATH_API = 'api';

export const CreateSkuAPI = {
    CreateSKU: (sku) => {
        const url = `${PATH_API}/sku`;
        return axiosClient.post(url, sku);
    },
    // do something here
}
export const UpdateSkuAPI ={
    EditSKU : (skuID) =>{
        const url =`${PATH_API}/sku/${skuID}`;
        return axiosClient.put(url, sku);
    }
}