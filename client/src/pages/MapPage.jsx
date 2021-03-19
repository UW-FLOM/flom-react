import React, {Component} from 'react';

import MapTool from '../components/MapTool';
import MapQuestion from '../components/MapQuestion';
import TitleRender from '../components/TitleRender';

export const featureFromGeometry = (geometry) => {
  if (geometry.type === 'polygon') {
    return {
      GISObject: {
        type: 'polygon',
        data: geometry.geometry,
      },
    };
  }
  return {};
};

class MapPage extends Component {
  constructor(prop) {
    super(prop);

    const storedGisDisplay = [];

    this.state = {
      questionID: this.props.activity.id,
      gisDisplay: storedGisDisplay,
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
      });
      if (this.props.activity.function !== 'additional') {
        this.setState({
          gisDisplay: [],
        });
      }
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

    let gis = this.state.gisDisplay;
    gis[id] = featureFromGeometry(featureGeometry);

    this.setState({
      gisDisplay: gis,
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

    const {gisDisplay, mode} = this.state;
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
          </div>
        </div>
        <div className="map">
          <MapTool
            tileURL={activity.tileURL}
            tileAttribution={activity.tileAttribution}
            center={activity.center}
            bounds={activity.bounds}
            zoom={activity.zoom}
            minZoom={activity.minZoom}
            maxZoom={activity.maxZoom}
            onFeatureDrawn={this.onFeatureDrawn}
            objects={Object.values(gisDisplay)}
            mode={mode}
          />
        </div>
      </div>
    );
  }
}

export default MapPage;
