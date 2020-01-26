import axios from 'axios';
import {SET_IMAGE_BUCKETS, SET_ALBUM_IMAGE, SET_ALBUM_LAYOUT, SET_NOTIFICATION} from "./types";
import {getFingerPrint} from "../utils/helper";
import {API_URL} from "../utils/constants";

const SUCCESS_NOTIFICATION = "success";
const ERROR_NOTIFICATION = "error";

/**
 * Retrieve all the images from the data source
 */
export const getGalleryImages = () => (dispatch) => {

    return axios.get(`https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json`)
        .then(res => {

            const buckets = [];
            for (let i = 0; i < 4; i++) {
                buckets[i] = [];
            }
            res.data.entries.forEach((obj, i) => {
                let bucket = i % 4;
                buckets[bucket].push(obj);
            })

            return dispatch({type: SET_IMAGE_BUCKETS, payload: buckets});
        })
        .catch((e) => {
            console.log('----error----', e);
        });

}


/**
 * On click image, toggle update store, insert if not exist, else remove
 *
 * @param selectedImage
 */
export const setSelections = (selectedImage) => (dispatch) => {

    return dispatch({type: SET_ALBUM_IMAGE, payload: selectedImage});
}

/**
 * Save album for the active fingerprint
 */
export const saveAlbum = (images, layout) => (dispatch) => {

    getFingerPrint().then((r) => {
            const fingerprint = r.result;
            return axios.post(API_URL+`/album`, {fingerprint, images, layout})
                .then(res => {
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

export const notification = (type) => (dispatch) => {

    let notification = {};

    switch (type) {
        case SUCCESS_NOTIFICATION :
            notification = {type: SUCCESS_NOTIFICATION, message: "Success"}
            break;
        case ERROR_NOTIFICATION :
            notification = {type: ERROR_NOTIFICATION, message: "Error"}
            break;
    }
    dispatch({type: SET_NOTIFICATION, payload: notification});

    setTimeout(() => { dispatch({type: SET_NOTIFICATION})}, 3000);
}