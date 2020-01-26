
import { combineReducers } from 'redux';

import gallery from './galleryReducer'
import album from './albumReducer'
export default combineReducers({
    gallery,
    album
})

