
import { combineReducers } from 'redux';

import gallery from './galleryaReducer'
import album from './albumReducer'
export default combineReducers({
    gallery,
    album
})

