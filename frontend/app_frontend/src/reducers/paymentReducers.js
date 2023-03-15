import { PAYMENT_METHOD_SAVE } from "../constants/paymentConstants";

export const paymentMethodReducer = (state = { paymentMethod: []}, action) => {
    switch (action.type) {

        case PAYMENT_METHOD_SAVE:
            return {
                ...state,
                paymentMethod: action.payload
            }

        default:
            return state
    }
}