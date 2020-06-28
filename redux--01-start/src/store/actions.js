export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBSTRACT = 'SUBSTRACT';

export const increment = () => {
    return {
        type: INCREMENT
    }
}

export const decrement = () => {
    return {
        type: DECREMENT
    }
}
export const added = (val) => {
    return {
        type: ADD,
        val
    }
}
export const add = (val) => {

    return (dispatch, getState) => {
        setTimeout(() => {
            console.log(getState().counterState.counter);
            dispatch(added(val));
        }, 2000);
    }
   
}

export const substract = (val) => {
    return {
        type: SUBSTRACT,
        val
    }
}