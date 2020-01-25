import {
    SET_VISIBILITY_FILTER
} from '../actions/types';

const initialState = {
    images : []
}

export default function gallery(state = initialState, action) {

    switch (action.type) {

        case SET_VISIBILITY_FILTER:
            return {...state, images: action.payload}
        default:
            return state
    }
}