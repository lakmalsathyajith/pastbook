import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from "react-router-dom";
import RGL, {WidthProvider} from "react-grid-layout";

import flatten from "lodash/flatten";
import find from "lodash/find";
import map from "lodash/map";

import {saveAlbum} from "../actions/photoActions";

const ReactGridLayout = WidthProvider(RGL);

class Album extends PureComponent {

    static defaultProps = {
        className: "layout",
        items: 9,
        rowHeight: 60,
        cols: 12
    };

    constructor(props) {
        super(props);
        const layout = this.generateLayout();
        this.state = {layout};
    }

    generateDOM() {

        const {images, selectedImages} = this.props;
        const selectedImageIds = map(selectedImages, 'id');

        let allImages = flatten(images);
        const domElements = selectedImageIds.map((image, i) => {
            let imageItem = find(allImages, ['id', image]);
            return <div key={i}>
                <img src={imageItem.picture} style={{"width": "100%"}} alt=""/>
            </div>

        });

        return domElements;
    }

    generateLayout() {

        const {selectedImages, rowHeight} = this.props;
        const layouts = [];
        selectedImages.forEach(function (item, i) {
            const y = Math.ceil(item.height / rowHeight) + 1;

            layouts.push({
                x: (i * 4) % 12,
                y: Math.floor(i / 3) * y,
                w: 4,
                h: y,
                i: i.toString()
            });
        });

        return layouts;
    }

    onLayoutChange = (layout) => {
        this.setState({layout})
    }

    handleSaveClick = (e) => {
        const {layout} = this.state;
        const {saveAlbum} = this.props;
        saveAlbum(JSON.stringify(layout));
    }

    render() {

        return (
            <div className="album-container">
                <ReactGridLayout
                    layout={this.state.layout}
                    onLayoutChange={this.onLayoutChange}
                    {...this.props}>
                    {this.generateDOM()}
                </ReactGridLayout>
                <Link to={"/"}>
                    <div className="fab prev fa fa-arrow-circle-left"></div>
                </Link>
                <button onClick={() => this.handleSaveClick()}>
                    <div className="fab fa fa-folder"></div>
                </button>
            </div>
        )
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
        saveAlbum
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);