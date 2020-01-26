import axios from 'axios';

import {SET_ALBUM_LAYOUT} from "./creators";
import {notification} from "../../actions/common/actions";
import {getFingerPrint} from "../../utils/helper";
import {API_URL} from "../../utils/constants";
import {SUCCESS_NOTIFICATION, ERROR_NOTIFICATION} from "../../actions/common/actions";

/**
 * Save album for the active fingerprint
 */
export const saveAlbum = (images, layout) => (dispatch) => {

    getFingerPrint().then((r) => {
            const fingerprint = r.result;
            return axios.post(API_URL+`/album`, {fingerprint, images, layout})
                .then(res => {
                    localStorage.setItem('fingerprint', fingerprint);
                    dispatch(notification(SUCCESS_NOTIFICATION));
                })
                .catch((e) => {
                    dispatch(notification(ERROR_NOTIFICATION));
                    console.log('----error----', e);
                });
        }
    );
}

/**
 * Get album for the given fingerprint.
 * Restore saved image set and the layout
 */
export const getAlbum = () => (dispatch) => {

    getFingerPrint().then((r) => {
            const fingerprint = r.result;
            return axios.get(API_URL+`/album/${fingerprint}`, {})
                .then(res => {
                    if(res.data && res.data.data)
                        return dispatch({type: SET_ALBUM_LAYOUT, payload: res.data.data});
                })
                .catch((e) => {
                    console.log('----error----', e);
                });
        }
    );
}