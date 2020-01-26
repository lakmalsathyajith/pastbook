import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from "react-router-dom";
import map from 'lodash/map';

import {getGalleryImages, setSelections} from "./actions";
import {getFilestackProcessedImage} from "../../utils/helper";
import {ALLOWED_NUMBER_OF_IMAGES, IMAGE_PROPERTIES} from "../../utils/constants";

import './style.css'

/**
 * Displaying all the images from the data source in an unorganized grid
 */
class Gallery extends Component {

    componentDidMount() {
        this.props.getGalleryImages();
    }

    onGalleryImageClick = (e, {id, picture}) => {

        const {selectedImages} = this.props;
        const img = e.target;
        const currWidth = img.clientWidth;
        const currHeight = img.clientHeight;
        const imageProps = {
            id,
            picture,
            width:currWidth,
            height : currHeight
        }
        const selectedImageIds = map(selectedImages, 'id');

        if((selectedImageIds.indexOf(id)!==-1) || (selectedImages.length<ALLOWED_NUMBER_OF_IMAGES)){
            this.props.setSelections(imageProps);
        }
    }

    renderImages = () => {

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

        return renderImages;
    }

    render() {

        const {selectedImages} = this.props;
        const threshold = ALLOWED_NUMBER_OF_IMAGES-(selectedImages.length);

        return (
            <div className="row">
                {this.renderImages()}
                <Link to={"album"}><div className={(threshold>0) ? "fab fa fa-arrow-circle-right disable-link" : "fab fa fa-arrow-circle-right"}/></Link>
                <span className="fab prev">{threshold}</span>
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
        setSelections
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);