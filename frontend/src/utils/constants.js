
export const IMAGE_API_URL = process.env.REACT_APP_IMAGE_API_URL || "https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json";
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/pastbook";

export const IMAGE_PROPERTIES = {
    resize : {height : 560},
    quality: {value:40}
}

export const ALLOWED_NUMBER_OF_IMAGES = 9;