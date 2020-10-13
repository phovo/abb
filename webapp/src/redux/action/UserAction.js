import { UserSevice } from "../../services/userSevice"
import { userAction } from "../const/userType"
import axios from 'axios'

export const LoginAction = (user) => {
    return dispatch=>{
        UserSevice.UserLogin(user).then(res=>{
            dispatch(userAction(res.data));
            localStorage.setItem('userLogin', JSON.stringify(res.data))
        }).catch(err=>{
            alert (`username or password does\''t not match`)
        })

}
}

