import React, { Component } from 'react';

import { map, get } from 'lodash';
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import FreeDraw, { CREATE } from 'leaflet-freedraw';
import { Typography } from 'antd';

const { Text } = Typography;
const TILE_URL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

export const polygonFromLatLngs = (latLngs) => {
  return {
    type: 'polygon',
    geometry: map(latLngs, (shape) => {
      return map(shape, (point) => {
        return[point.lat, point.lng];
      });
    })
  };
};

class MapTool extends Component {
  state = {
    lat: get(this.props, 'center[0]', 47.6202),
    lng: get(this.props, 'center[1]', -122.3472),
    zoom: get(this.props, 'zoomLevel', 13),
    markers: []
  }

  componentDidMount() {
    this.map = this.leafletMap.leafletElement;

    const freeDraw = new FreeDraw();
    this.freeDraw = freeDraw;
    this.map.addLayer(freeDraw);

    freeDraw.mode(CREATE);
    freeDraw.on('markers', (event) => this.handleFeatureDrawn(event));
  }

  componentWillUnmount() {
    this.map.removeLayer(this.freeDraw);
  }

  handleFeatureDrawn(event){
    if (event.eventType !== 'clear'){
      this.props.onFeatureDrawn(polygonFromLatLngs(event.latLngs));
      this.freeDraw.clear();
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <div>
        <Map
          style={{
            height: '100%',
            width: '100%'
          }}
          center={position}
          zoom={this.state.zoom}
          ref={(m) => { this.leafletMap = m; }}>
          <TileLayer
            attribution={TILE_ATTRIBUTION}
            url={TILE_URL}
          />
          {
            map(this.props.polygons, (polygon, idx) =>{
              return(
                <Polygon
                  key={'poly' + idx}
                  color="#b1ef8d"
                  positions={polygon.polygon}
                />
              );
            })
          }

          {
            map(this.props.markers, (marker, idx) => {
              return (
                <Marker key={idx} position={[marker.lat, marker.lng]}>
                  <Popup>
                    <Typography>
                      <Text>
                        {marker.lat}, {marker.lng}
                      </Text>
                    </Typography>
                  </Popup>
                </Marker>
              );
            })
          }
        </Map>

      </div>
    );
  }
}

export default MapTool;
