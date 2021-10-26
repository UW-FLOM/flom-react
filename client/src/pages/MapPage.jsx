import React, { Component, lazy, Suspense } from 'react';

// import MapTool from '../components/MapTool';
//import MapQuestion from '../components/MapQuestion';
import TitleRender from '../components/TitleRender';
import Loading from '../components/Loading'

const MapTool = lazy(() => import('../components/MapTool')
  .then(({ default: MapTool }) => ({ default: MapTool })));
const MapQuestion = lazy(() => import('../components/MapQuestion')
  .then(({ default: MapQuestion }) => ({ default: MapQuestion })));

// Process Freedraw's latLngs to GeoJson Object
export const featureFromGeometry = (geometry) => {
  let GeoJsonTemplate = {
    "type": "Feature",
    "geometry": {},
    "properties": {}
  }
  if (geometry.type === 'polygon') {
    let json = GeoJsonTemplate["geometry"]
    json["type"] = "Polygon";
    json["coordinates"] = geometry.geometry;
    return GeoJsonTemplate;
  }
  return {};
};

class MapPage extends Component {
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
      gisDisplay,
    });
  }

  onFeatureDrawn = (featureGeometry) => {
    const id = this.state.questionID;

    this.props.onChange(id, featureFromGeometry(featureGeometry));

    let gis = this.state.gis;
    gis.push(featureFromGeometry(featureGeometry));

    this.setState({
      gis: gis,
      mode: "NONE",
    });
  }

  fireDraw() {
    this.setState({
      mode: 'CREATE',
    });
  }

  render() {
    const {
      activity,
      values,
      onChange,
      current,
      length,
    } = this.props;

    const {gis, mode} = this.state;
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
            <Suspense fallback={<Loading/>}>
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
          <Suspense fallback={<Loading/>}>
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

export default MapPage;
