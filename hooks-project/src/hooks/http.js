import {useReducer, useCallback} from 'react';
const httpReducer = (httpState, action) => {
    switch(action.type){
      case 'SEND':
        return {...httpState, loading: true, error: null, extra: action.extra, method: action.method};
      case 'RESPONSE':
        return {...httpState, loading: false, error: null, data: action.data, extra: action.extra};
      case 'ERROR':
        return {...httpState, loading: false, error: action.errorMessage};
      case 'CLEAR': 
        return {...httpState, loading: false, error: null, data: null, method: null, extra: null};  
      default:
        throw new Error('Should not get here');   
    }
  }

const useHttp = () => {
    const [httpState, httpDispatch] = useReducer(httpReducer, {loading: true, error: null, data: [], extra: null});
    const sendRequest = useCallback(
        (url, method, body, extra) => {
            httpDispatch({
                type: 'SEND',
                extra,
                method
            });
            fetch(url,{
                method,
                body,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(responseData => {
                httpDispatch({
                    type: 'RESPONSE',
                    data: responseData,
                    extra: (method === 'POST') ? body : extra
                });
            }).catch(error => {
                httpDispatch({
                    type: 'ERROR', errorMessage: error.message
                });
            })
        },
        [],
    );

    const clearError = useCallback(
        () => {
            httpDispatch({
                type: 'CLEAR'
            });
        },
        [],
    )
    return {
        loading: httpState.loading,
        error: httpState.error, 
        data: httpState.data,
        extra: httpState.extra,
        sendRequest: sendRequest,
        clearError,
        method: httpState.method
    }
}

export default useHttp;