
import {
    SET_NOTIFICATION
} from '../../actions/creators';

const initialState = {
    notification : null,
    loader:{}
}

export default function common(state = initialState, action) {

    switch (action.type) {

        case SET_NOTIFICATION:

            return {...state, notification:action.payload}
        default:
            return state
    }
}