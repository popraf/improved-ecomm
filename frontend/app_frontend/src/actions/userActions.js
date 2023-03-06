import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT
 } from "../constants/userConstants";
import axios from 'axios';

// http://127.0.0.1:8000/api/user/login/

const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        
        const config = {headers: {
            'Content-type':'application/json'
        }}
        const {data} = await axios.post(
            '/api/users/login',
            {'username':email,
            'password':password},
            config
            )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userLoginInfo', JSON.stringify(data))
    } catch (error) {
        type: USER_LOGIN_FAILURE
    }
}