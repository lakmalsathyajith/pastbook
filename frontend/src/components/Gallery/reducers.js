import {
    SET_IMAGE_BUCKETS
} from './creators';

const initialState = {
    images : []
}

export default function gallery(state = initialState, action) {

    switch (action.type) {

        case SET_IMAGE_BUCKETS:
            return {...state, images: action.payload}
        default:
            return state
    }
}