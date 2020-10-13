import axiosClient from "../axiosClient";

const PATH_API = 'api';

const SKUApis = {
    getSKUById: (id) => {
        const url = 'api/sku';
        return axiosClient.get(url+ '/' +id);
    },
    updateSKUById: (sku) => {
        const url = `${PATH_API}/sku/${sku.id}`;
        return axiosClient.put(url, sku);
    }
    // do something here
}

export default SKUApis;