import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from "react-router-dom";
import RGL, {WidthProvider} from "react-grid-layout";

import {saveAlbum, getAlbum} from "../actions/photoActions";
import {getFilestackProcessedImage} from "../utils/helper";
import {IMAGE_PROPERTIES} from "../utils/constants";

const ReactGridLayout = WidthProvider(RGL);

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

    generateDOM() {

        const {selectedImages} = this.props;
        const domElements = selectedImages.map((image, i) => {
            return <div key={i}>
                <img src={getFilestackProcessedImage(image.picture, IMAGE_PROPERTIES)} style={{"width": "100%"}} alt=""/>
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
        const {saveAlbum, selectedImages} = this.props;
        saveAlbum(JSON.stringify(selectedImages), JSON.stringify(layout));
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
        selectedImages: state.album.selectedImages,
        layouts: state.album.layouts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveAlbum,
        getAlbum
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);