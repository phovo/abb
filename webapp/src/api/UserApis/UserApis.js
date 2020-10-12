import axiosClient from "../axiosClient";

const UserApis = {
    findUserNameAndPassword: (user) => {
        const url = 'login';
        return axiosClient.post(url, {user});
    },

    logout: () => {
        const url = 'logout';
        return axiosClient.post(url);
    },
    // do something here
}

export default UserApis;