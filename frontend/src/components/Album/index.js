import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from "react-router-dom";
import RGL, {WidthProvider} from "react-grid-layout";

import {saveAlbum, getAlbum} from "./actions";
import {getFilestackProcessedImage} from "../../utils/helper";
import {IMAGE_PROPERTIES} from "../../utils/constants";

import './style.css'

const ReactGridLayout = WidthProvider(RGL);

/**
 * Render the user selected album in a flexible grid.
 */
class Album extends PureComponent {

    static defaultProps = {
        className: "layout",
        items: 9,
        rowHeight: 30,
        cols: 12
    };

    constructor(props) {
        super(props);
        const layout = this.generateLayout();
        this.state = {layout};
    }

    componentDidMount(){
        if(!this.props.selectedImages.length > 0){
            this.props.getAlbum()
        }

    }

    componentDidUpdate(prevProps, prevState){

        const {layouts} = this.props;
        if(prevProps.layouts !== layouts){
            this.onLayoutChange(layouts);
        }
    }

    /**
     * Create the dom elements, resizing, using the selected image set
     */
    generateDOM() {

        const {selectedImages} = this.props;
        const domElements = selectedImages.map((image, i) => {
            return <div key={i}  className="album-element">
                <img src={getFilestackProcessedImage(image.picture, IMAGE_PROPERTIES)} style={{"width": "100%"}} alt=""/>
            </div>

        });

        return domElements;
    }

    /**
     * Generate the album image grid layout using selected image set
     * @returns {Array}
     */
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

    /**
     * On re-arranging the images, layout changes, updating state with the latest layout
     * @param layout
     */
    onLayoutChange = (layout) => {
        this.setState({layout})
    }

    /**
     * On save button clicks save the current images with the layout
     * @param e
     */
    handleSaveClick = (e) => {
        const {layout} = this.state;
        const {saveAlbum, selectedImages} = this.props;
        saveAlbum(JSON.stringify(selectedImages), JSON.stringify(layout));
    }

    render() {

        const {notification} = this.props;

        return (
            <div className="album-container">
                <ReactGridLayout
                    layout={this.state.layout}
                    onLayoutChange={this.onLayoutChange}
                    {...this.props}>
                    {this.generateDOM()}
                </ReactGridLayout>
                <Link to={{
                    pathname: '/',
                    state: {from: "album"}
                }}>
                    <div className="fab prev fa fa-arrow-circle-left"></div>
                </Link>
                <button onClick={() => this.handleSaveClick()}>
                    <div className="fab fa fa-folder"></div>
                </button>
                {(notification) ? <span className="message-bar fa fa-check">
                    <strong>Saved!</strong>
                </span> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.gallery.images,
        selectedImages: state.album.selectedImages,
        layouts: state.album.layouts,
        notification: state.common.notification,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveAlbum,
        getAlbum
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);