import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from "react-router-dom";
import map from 'lodash/map';

import {getGalleryImages, setSelections} from "../actions/photoActions";

class Gallery extends Component {

    componentDidMount() {
        this.props.getGalleryImages();
    }

    onGalleryImageClick = (e, imageId) => {

        let myImg = e.target;
        let currWidth = myImg.clientWidth;
        let currHeight = myImg.clientHeight;
        //alert("Current width=" + currWidth + ", " + "Original height=" + currHeight);

        const imageProps = {
            id :imageId,
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
                        this.onGalleryImageClick(e,image.id)
                    }}>
                        <img src={image.picture} style={{"width": "100%"}} alt=""/>
                        {(selectedImageIndex !== -1) ?
                            <div className="text">
                            <h1>{selectedImageIndex + 1}</h1>
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
                <Link to={"album"}><div className="fab"> + </div></Link>
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