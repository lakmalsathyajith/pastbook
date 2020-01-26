
import {SET_NOTIFICATION} from "../creators";

export const SUCCESS_NOTIFICATION = "success";
export const ERROR_NOTIFICATION = "error";

export const notification = (type) => (dispatch) => {

    let notification = {};

    switch (type) {
        case SUCCESS_NOTIFICATION :
            notification = {type: SUCCESS_NOTIFICATION, message: "Success"};
            break;
        case ERROR_NOTIFICATION :
            notification = {type: ERROR_NOTIFICATION, message: "Error"};
            break;
        default:
            return notification = {type: SET_NOTIFICATION};
    }
    dispatch({type: SET_NOTIFICATION, payload: notification});

    setTimeout(() => { dispatch({type: SET_NOTIFICATION})}, 3000);
}