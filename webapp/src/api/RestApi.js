import axiosClient from "./axiosClient";

const RestApi = {
    findUserNameAndPassword: (user) => {
        const url = 'login';
        return axiosClient.post(url, {user});
    }
    // do something here
}

export default RestApi;