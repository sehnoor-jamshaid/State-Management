
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

//start of action creator
export function changeLang(data) {
    return {
        type: CHANGE_LANGUAGE,
        payload: data
    };
}
//end of action creator


//start of reducer creator
const initialState = {
   cart:[]
};

export const cartReducer = persistReducer(
    { storage, key: 'root', },
    (state=initialState , action) => {
        switch (action.type) {
            case "ADD_TO_CART":
                return {
                    ...state,
                    cart: [...state.cart,{...action.payload}],
                };
                case "REMOVE_CART":
                    return {
                        ...state,
                        cart: state.cart.filter((c)=>c.id!=action.payload.id),
                    };
            default:
                return state;
        }
    }
);
//end of reducer creator


export default cartReducer;