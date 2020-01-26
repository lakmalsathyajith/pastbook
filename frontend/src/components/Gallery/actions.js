import axios from 'axios';
import {SET_IMAGE_BUCKETS} from "./creators";
import {SET_ALBUM_IMAGE} from "../Album/creators";

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