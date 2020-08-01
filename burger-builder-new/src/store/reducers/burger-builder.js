import * as actionTypes from './../actions';

const INGREDIENT_PRICE = {
    salad:1.5,
    meat:2.3,
    cheese:2.1,
    bacon:0.9
}

const initialState = {
    ingredients : null,
    totalPrice: 0,
    ingredientPrice: INGREDIENT_PRICE,
    isBuilding: false
}


const reducer = (state =initialState, action) =>{
    switch(action.type){

        case actionTypes.ADD_INGREDIENT: 

            const oldCount = state.ingredients[action.ingredientType];
            const updatedCount = oldCount + 1;
            const updatedIngredientState = {...state.ingredients};
            updatedIngredientState[action.ingredientType] = updatedCount;
            const additionalPrice = state.ingredientPrice[action.ingredientType];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice + additionalPrice;
            return {
                ...state,
                ingredients: updatedIngredientState,
                totalPrice: newPrice,
                isBuilding: true
            };

        case actionTypes.REMOVE_INGREDIENT:

            const countBefore = state.ingredients[action.ingredientType];
            const updatedCountAfter = countBefore - 1;
            const updatedIngredientStateAfter = {...state.ingredients};
            updatedIngredientStateAfter[action.ingredientType] = (updatedCountAfter >=0 ) ? updatedCountAfter : 0;
            const additionalPriceAfter = state.ingredientPrice[action.ingredientType];
            const priceBefore = state.totalPrice;
            const priceAfter = priceBefore - additionalPriceAfter;
            return {
               ...state,
                ingredients: updatedIngredientStateAfter,
                totalPrice: priceAfter,
                isBuilding: true
            };

        case actionTypes.INGREDIENTS_LOADED:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 5
            }    
        default :
        return state;
    }
}


export default reducer;