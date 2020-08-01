import axios from './../axios-orders';
import authAxios from 'axios';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const INGREDIENTS_LOADED = 'INGREDIENTS_LOADED';
export const ORDER_LOADED = 'ORDER_LOADED';
export const ORDER_LOAD_FAILED = 'ORDER_LOAD_FAILED';
export const ORDER_LOADING = 'ORDER_LOADING';
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const LOGOUT = 'LOGOUT'; 
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';

export const addIngredient = (ingredientType) => {
    return {type:ADD_INGREDIENT, ingredientType }
}

export const removeIngredient = (ingredientType) => {
    return {type:REMOVE_INGREDIENT, ingredientType }
}

export const ingredientsLoaded = (ingredients) => {
    return {type:INGREDIENTS_LOADED, ingredients }
}

export const loadIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
            dispatch(ingredientsLoaded(response.data));
        })
        .catch(error => console.log(error));
    }
}

export const orderLoaded = (orders) => {
    return {type:ORDER_LOADED, orders }
}

export const orderFaliedToLoad = () => {
return {type:ORDER_LOAD_FAILED}
}

export const orderLoading = () => {
    return {type:ORDER_LOADING}
    }

export const loadOrders = (token) => {
    return dispatch => {
        dispatch(orderLoading())
        axios.get(`/orders.json?auth=${token}`).then(
            (response) => {
                const fetchedOrders = [];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch(orderLoaded(fetchedOrders))
            }
        )
        .catch((error) => (dispatch(orderFaliedToLoad())));
    }
}

export const authStart = () => {
    return {
        type: AUTH_START
    }
}

export const logout = () => {
    localStorage.removeItem('authData');
    localStorage.removeItem('expiryDate');
    return {
        type : LOGOUT
    }
}

export const checkTokenExpiry = (expiryTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiryTime*1000);
    }
}

export const authSuccess = (authData) => {
    localStorage.setItem('authData', JSON.stringify(authData));
    const expiryDate = new Date(new Date().getTime() + authData.expiresIn * 1000);
    localStorage.setItem('expiryDate', expiryDate);
    return {type: AUTH_SUCCESS, authData}
}

export const authFailed = (error) => {
    return {type: AUTH_FAILED, error}
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        const url = isSignUp ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmW9J98Z7AaQAv6ykvYS0nm4vZhNMqAuw' : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmW9J98Z7AaQAv6ykvYS0nm4vZhNMqAuw';
        authAxios.post(url, authData)
        .then(response =>{ dispatch(authSuccess(response.data)); dispatch(checkTokenExpiry(response.data.expiresIn))})
        .catch(error => {dispatch(authFailed(error.response.data.error))})
        
    }
}

export const setAuthRedirectPath = (path) => {
    return {type: SET_AUTH_REDIRECT_PATH, path};
}

export const authCheckState = () => {
    return dispatch => {
        const authData = JSON.parse(localStorage.getItem('authData'));
        if(authData !== null) {
            const expiryDate = new Date(localStorage.getItem('expiryDate'));
            if(expiryDate > new Date()) {
                dispatch(authSuccess(authData));
                dispatch(checkTokenExpiry((expiryDate.getTime() - new Date().getTime())/1000));
            } else{
                dispatch(logout());
            }
        }else {
            dispatch(logout());
        }
    };
}