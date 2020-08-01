import {put} from 'redux-saga/effects'
import {LOGOUT} from './../actions';

export function* logout()  {
   yield localStorage.removeItem('authData');
   yield localStorage.removeItem('expiryDate');
   yield put({
        type : LOGOUT
    });
}