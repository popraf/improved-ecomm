import { SHIPPING_ADDRESS_SAVE } from "../constants/shippingConstants"

export const shippingAddressSaveAction = (data) => (dispatch) => {
    dispatch({
        type: SHIPPING_ADDRESS_SAVE,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}