import React, {Component} from 'react';
import {connect} from 'react-redux';

import flatten from "lodash/flatten";
import find from "lodash/find";
import map from "lodash/map";

import RGL, {WidthProvider} from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);

class Album extends Component {

    static defaultProps = {
        className: "layout",
        items: 9,
        rowHeight: 30,
        onLayoutChange: function () {
        },
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
        const p = this.props;
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

    onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
    }

    render() {
        // layout is an array of objects, see the demo for more complete usage
        const layout = [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}
        ];
        return (

            <ReactGridLayout
                layout={this.state.layout}
                onLayoutChange={this.onLayoutChange}
                {...this.props}
            >
                {this.generateDOM()}
            </ReactGridLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.gallery.images,
        selectedImages: state.album.selectedImages
    }
}

export default connect(mapStateToProps)(Album);