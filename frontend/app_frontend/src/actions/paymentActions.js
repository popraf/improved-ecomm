import { PAYMENT_METHOD_SAVE } from "../constants/paymentConstants"

export const savePaymentAction = (data) => (dispatch) => {
    dispatch({
        type: PAYMENT_METHOD_SAVE,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}