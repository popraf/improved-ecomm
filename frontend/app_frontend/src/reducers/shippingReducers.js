import { SHIPPING_ADDRESS_SAVE } from "../constants/shippingConstants";

export const shippingAddressReducer = (state = { shippingAddress: [] }, action) => {
    switch(action.type) {
        case SHIPPING_ADDRESS_SAVE:
            return {
                ...state,
                shippingAddress: action.payload
            }

        default:
            return state
    }
};
