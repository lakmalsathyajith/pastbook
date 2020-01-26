
import xorBy from 'lodash/xorBy';
import {
    SET_ALBUM_IMAGE,
    SET_ALBUM_LAYOUT,
    //SET_NOTIFICATION
} from './creators';

const initialState = {
    selectedImages : [],
    layouts:[],
    notification : null
}

export default function album(state = initialState, action) {

    switch (action.type) {
        case SET_ALBUM_IMAGE:
            let newSelection = xorBy([...state.selectedImages], [action.payload], 'id');

            return {...state, selectedImages: [...newSelection]}
        case SET_ALBUM_LAYOUT:

            return {...state, selectedImages:action.payload.images, layouts: [...action.payload.layout]}
        /*case SET_NOTIFICATION:

            return {...state, notification:action.payload}*/
        default:
            return state
    }
}