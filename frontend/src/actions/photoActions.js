import axios from 'axios';
import {SET_VISIBILITY_FILTER, SET_ALBUM_IMAGE, SET_ALBUM_LAYOUT} from "./types";
import {getFingerPrint} from "../utils/helper";

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

            return dispatch({type: SET_VISIBILITY_FILTER, payload: buckets});
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
            return axios.post(`http://localhost:8000/pastbook/album`, {fingerprint, images, layout})
                .then(res => {
                })
                .catch((e) => {
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
            return axios.get(`http://localhost:8000/pastbook/album/${fingerprint}`, {})
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