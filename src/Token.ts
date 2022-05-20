import {makeVar} from '@apollo/client';

const token = window.localStorage.getItem('api-token');

export const tokenVar = makeVar<string | null>(token);

export function setTokenVar(val: string | null){
    if (val)
        window.localStorage.setItem('api-token', val);
    else
        window.localStorage.removeItem('api-token');
    tokenVar(val)
}
