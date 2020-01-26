
import { combineReducers } from 'redux';

import common from './common/reducers'
import gallery from '../components/Gallery/reducers'
import album from '../components/Album/reducers'
export default combineReducers({
    gallery,
    album,
    common
})

