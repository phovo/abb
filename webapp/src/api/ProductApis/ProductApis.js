import axiosClient from "../axiosClient";

const ProductApis = {
    CreateProduct: (product) => {
        const url = '';
        return axiosClient.post(url, {product});
    },
    // do something here
}

export default ProductApis;