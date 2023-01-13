import { Component, lazy, Suspense } from 'react';

import TitleRender from '../TitleRender';
import Loading from '../Loading';

const MapTool = lazy(() => import('../MapTool'));
const MapQuestion = lazy(() => import('../MapQuestion'));

// Process Freedraw's latLngs to GeoJson Object
export const featureFromGeometry = (geometry) => {
    const GeoJsonTemplate = {
        geometry: {},
    };
    if (geometry.type === 'polygon') {
        const json = GeoJsonTemplate.geometry;
        json.type = 'Polygon';
        json.coordinates = geometry.geometry;
        return GeoJsonTemplate;
    }
    return {};
};

class MapRender extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            questionID: this.props.activity.id,
            gis: [],
            mode: 'NONE',
        };

        this.fireDraw = this.fireDraw.bind(this);
        this.updateQuestionID = this.updateQuestionID.bind(this);
        this.changeGIS = this.changeGIS.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activity !== this.props.activity) {
            this.setState({
                questionID: 0,
                mode: 'NONE',
                gis: [],
            });
        }
    }

    updateQuestionID(id) {
        this.setState({
            questionID: id,
        });
    }

    changeGIS(gis) {
        const gisDisplay = [];
        gisDisplay[0] = gis;
        this.setState({
            gis: gisDisplay,
        });
    }

    onFeatureDrawn = (featureGeometry) => {
        const id = this.state.questionID;

        this.props.onChange(id, featureFromGeometry(featureGeometry));

        const { gis } = this.state;
        gis.push(featureFromGeometry(featureGeometry));

        this.setState({
            gis,
            mode: 'NONE',
        });
    };

    fireDraw() {
        this.setState({
            mode: 'CREATE',
        });
    }

    render() {
        const { activity, values, onChange, current, length } = this.props;

        const { gis, mode } = this.state;
        return (
            <div className="mapContainer" id="mapContainer">
                <div className="side" id="side">
                    <div
                        style={{
                            padding: '0 20px',
                            overflow: 'auto',
                        }}
                    >
                        <TitleRender
                            id={activity.id}
                            title={activity.title}
                            intro={activity.helpText}
                            current={current}
                            length={length}
                        />
                        <Suspense fallback={<Loading />}>
                            <MapQuestion
                                key={activity.id}
                                activity={activity}
                                fireDraw={this.fireDraw}
                                values={values}
                                mode={mode}
                                onChange={onChange}
                                updateQuestionID={this.updateQuestionID}
                                changeGIS={this.changeGIS}
                                onFinish={this.props.onFinish}
                            />
                        </Suspense>
                    </div>
                </div>
                <div className="map">
                    <Suspense fallback={<Loading />}>
                        <MapTool
                            tileURL={activity.tileURL}
                            tileAttribution={activity.tileAttribution}
                            center={activity.center}
                            bounds={activity.bounds}
                            zoom={activity.zoom}
                            minZoom={activity.minZoom}
                            maxZoom={activity.maxZoom}
                            onFeatureDrawn={this.onFeatureDrawn}
                            objects={Object.values(gis)}
                            mode={mode}
                        />
                    </Suspense>
                </div>
            </div>
        );
    }
}

export default MapRender;
