import axios from 'axios';
import {SET_VISIBILITY_FILTER, SET_ALBUM_IMAGE} from "./types";

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
            console.log('----erroe----', e);
        });

}

export const setSelections = (selectedImage) => (dispatch) => {

    return dispatch({type: SET_ALBUM_IMAGE, payload: selectedImage});
}