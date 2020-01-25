
import xorBy from 'lodash/xorBy';
import {
    SET_ALBUM_IMAGE
} from '../actions/types';

const initialState = {
    selectedImages : []
}

export default function album(state = initialState, action) {

    switch (action.type) {
        case SET_ALBUM_IMAGE:
            let newSelection = xorBy([...state.selectedImages], [action.payload], 'id');

            return {...state, selectedImages: [...newSelection]}
        default:
            return state
    }
}