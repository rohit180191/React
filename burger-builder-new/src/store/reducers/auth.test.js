import reducer from './auth';
import * as actionTypes from './../actions';

describe('auth reducer', () => {
    it('should return initial state if wrong action type pass', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            refreshToken: null,
            authRedirectPath:'/'
        });
    });
});