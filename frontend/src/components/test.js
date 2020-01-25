import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from "react-router-dom";

import flatten from "lodash/flatten";
import _ from "lodash";

import RGL, {WidthProvider} from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

class Album extends Component {
    static defaultProps = {
        className: "layout",
        items: 20,
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

        let imagesToDispaly = flatten(images).filter((image) => {
            return selectedImages.indexOf(image.id) !== -1;
        }).map((image, i) => {
            return (
                <div key={i}>
                    {/*<span className="text">{i}</span>*/}
                    <img src={image.picture} style={{"width": "100%"}} alt=""/>
                </div>
            )
        });

        console.log('imagesToDispaly==', flatten(images))

        return imagesToDispaly;
    }

    generateLayout() {
        const p = this.props;
        return _.map(new Array(p.items), function (item, i) {
            const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
            return {
                x: (i * 2) % 12,
                y: Math.floor(i / 6) * y,
                w: 2,
                h: y,
                i: i.toString()
            };
        });
    }

    onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
    }

    render() {
        return (
            <ReactGridLayout
                layout={this.state.layout}
                onLayoutChange={this.onLayoutChange}
                {...this.props}
            >
                {this.generateDOM()}
            </ReactGridLayout>
        );
    }
}


console.log('domElements==', domElements)
return domElements;



const mapStateToProps = (state) => {
    return {
        images: state.gallery.images,
        selectedImages: state.album.selectedImages
    }
}

export default connect(mapStateToProps)(Album);