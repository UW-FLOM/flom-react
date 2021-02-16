import React, { Component } from 'react';

import { map, get } from 'lodash';
import {
  TileLayer, Marker, Popup, Polygon, Map,
} from 'react-leaflet';
import FreeDraw, { CREATE, NONE } from 'leaflet-freedraw';
import { Typography } from 'antd';

const { Text } = Typography;
const TILE_URL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

const freeDraw = new FreeDraw();

export const polygonFromLatLngs = (latLngs) => ({
  type: 'polygon',
  geometry: map(latLngs, (shape) => map(shape, (point) => [point.lat, point.lng])),
});

class MapTool extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      lat: get(this.props, 'center[0]', 47.6202),
      lng: get(this.props, 'center[1]', -122.3472),
      zoom: get(this.props, 'zoomLevel', 13),
      markers: [],
      objects: this.props.objects,
      mode: 'NONE',
      width: '100vw',
      height: '100vh',
    };
  }

  componentDidMount() {
    this.map = this.leafletMap.leafletElement;
    this.map.addLayer(freeDraw);

    this.setState({
      mode: this.props.mode,
      width: '100%',
      height: '100%',
    });
    this.changeMode(this.props.mode);

    freeDraw.on('markers', (event) => {
      this.handleFeatureDrawn(event);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.objects !== this.props.objects) {
      this.setState({ objects: this.props.objects });
    }
    if (prevProps.mode !== this.props.mode) {
      this.setState({ mode: this.props.mode });
      this.changeMode(this.props.mode);
    }
  }

  componentWillUnmount() {
    this.map.removeLayer(freeDraw);
  }

  handleFeatureDrawn(event) {
    if (event.eventType !== 'clear') {
      if (event.latLngs !== undefined || event.latLngs.length !== 0) {
        this.props.onFeatureDrawn(polygonFromLatLngs(event.latLngs));
        freeDraw.clear();
      }
    }
  }

  changeMode(mode) {
    if (mode === 'NONE') {
      freeDraw.mode(NONE);
    }
    if (mode === 'CREATE') {
      freeDraw.mode(CREATE);
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map
        style={{
          width: this.state.width,
          height: this.state.height,
          touchAction: 'none',
        }}
        center={position}
        zoom={this.state.zoom}
        draggable={this.state.mode === 'NONE'}
        ref={(m) => { this.leafletMap = m; }}
      >
        <TileLayer
          attribution={TILE_ATTRIBUTION}
          url={TILE_URL}
        />
        {
          map(this.state.objects, (object, idx) => (
            <Polygon
              key={idx}
              color="#b1ef8d"
              positions={object.GISObject.data}
            />
          ))
        }

        {
          map(this.props.markers, (marker, idx) => (
            <Marker key={idx} position={[marker.lat, marker.lng]}>
              <Popup>
                <Typography>
                  <Text>
                    {marker.lat}
                    ,
                    {marker.lng}
                  </Text>
                </Typography>
              </Popup>
            </Marker>
          ))
        }
      </Map>
    );
  }
}

export default MapTool;
