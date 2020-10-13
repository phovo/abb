import axiosClient from "../axiosClient";

const PATH_API = 'api';

const ProductApis = {
    CreateProduct: (product) => {
        const url = `${PATH_API}/product`;
        return axiosClient.post(url, product);
    },
    // do something here
}

export default ProductApis;