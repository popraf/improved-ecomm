import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM 
} from "../constants/userCartConstants";

export const userCartReducer = (state = { userCartItems: [] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const cartItem = action.payload;
            const existingItem = state.userCartItems.find(x => x.product === cartItem.product);

            if(existingItem){
                return{
                    ...state,
                    userCartItems: state.userCartItems.map(x => x.product === existingItem.product ? cartItem : x)
                }
            } else {
                return {
                    ...state,
                    userCartItems: [...state.userCartItems, cartItem]    
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                userCartItems: state.userCartItems.filter(x => x.product !== action.payload)
            }

        default:
            return state
    }
};
