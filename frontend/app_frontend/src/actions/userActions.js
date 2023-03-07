import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE
 } from "../constants/userConstants";
import axios from 'axios';

// http://127.0.0.1:8000/api/user/login/

export const userLoginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        
        const config = {headers: {
            'Content-type':'application/json'
        }}
        const {data} = await axios.post(
            '/api/user/login/',
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
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const userLogoutAction = () => (dispatch) => {
    localStorage.removeItem('userLoginInfo')
    dispatch({
        type: USER_LOGOUT,
    })
}

export const userRegisterAction = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        
        const config = {headers: {
            'Content-type':'application/json'
        }}
        const {data} = await axios.post(
            '/api/user/register/',
            {
                'name':name,
                'email':email,
                'password':password
            },
            config
            )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
