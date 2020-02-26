import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS, STOP_LOADING_UI, LOAD_COMPANY } from '../types';

const initialState = {
    loading: false,
    errors: {},
    company: {}
}

export default function uiReducer(state = initialState, action) {
    switch(action.type){
        case SET_ERRORS: 
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERRORS: 
            return {
                ...state,
                loading: false,
                errors: {}
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            }
        case LOAD_COMPANY:
            return {
                ...state,
                company: action.payload
            }
        default: 
            return state;
    }
}