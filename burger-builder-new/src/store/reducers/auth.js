import * as actionTypes from './../actions';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    refreshToken: null,
    authRedirectPath:'/'
}

const reducer = (state= initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return {...state, loading: true, error: null};
        case actionTypes.AUTH_FAILED:
            return {...state, loading: false, error: action.error};
        case actionTypes.AUTH_SUCCESS:
            return {...state, loading: false, error: null, token: action.authData.idToken, userId: action.authData.localId, refreshToken: action.authData.refreshToken} ;   
        case actionTypes.LOGOUT: 
            return {...state, token: null, userId: null, refreshToken: null, loading: false, error: null};     
        case actionTypes.SET_AUTH_REDIRECT_PATH: 
            return {...state, authRedirectPath: action.path}        
        default:
            return {...state};    
    }
}

export default reducer;