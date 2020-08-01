import * as actionTypes from './../actions';

const initialState = {
    orders: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ORDER_LOADED:
            return {
                ...state,
                orders: [...action.orders],
                loading: false
            };
        case actionTypes.ORDER_LOAD_FAILED:
                return {
                    ...state,
                    loading: false
                } 
        case actionTypes.ORDER_LOADING:
            return {
                ...state,
                loading: true
            }          
        default:
        return {...state};
    }
    
}

export default reducer;