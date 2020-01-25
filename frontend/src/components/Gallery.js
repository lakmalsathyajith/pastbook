import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from "react-router-dom";
import map from 'lodash/map';

import {getGalleryImages, setSelections, saveAlbum} from "../actions/photoActions";
import {getFilestackProcessedImage} from "../utils/helper";
import {IMAGE_PROPERTIES} from "../utils/constants";

class Gallery extends Component {

    componentDidMount() {
        this.props.getGalleryImages();
    }


    onGalleryImageClick = (e, {id, picture}) => {

        let img = e.target;
        let currWidth = img.clientWidth;
        let currHeight = img.clientHeight;
        const imageProps = {
            id,
            picture,
            width:currWidth,
            height : currHeight
        }
        this.props.setSelections(imageProps);
    }

    render() {

        const {images, selectedImages} = this.props;
        const selectedImageIds = map(selectedImages, 'id');
        const renderImages = images && images.map((bucket, i) => {
            let renderedImages = bucket.map((image) => {
                let selectedImageIndex = selectedImageIds.indexOf(image.id);

                return (
                    <div key={image.id} className="box" onClick={(e) => {
                        this.onGalleryImageClick(e,image)
                    }}>
                        <img src={getFilestackProcessedImage(image.picture,IMAGE_PROPERTIES)} style={{"width": "100%"}} alt=""/>
                        {(selectedImageIndex !== -1) ?
                            <div className="text">
                            <span className="gallery-check fa fa-check"></span>
                        </div> : null}
                    </div>
                )
            });

            return (
                <div key={i} className="column">
                    {renderedImages}
                </div>
            )
        });

        return (
            <div className="row">
                {renderImages}
                <Link to={"album"}><div className="fab fa fa-arrow-circle-right"/></Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.gallery.images,
        selectedImages: state.album.selectedImages
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getGalleryImages,
        setSelections,
        saveAlbum
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);