import React, { Component } from 'react';
import styled from 'styled-components';

import { map } from 'lodash';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import FreeDraw, { CREATE, EDIT } from 'leaflet-freedraw';
import { Button } from 'react-bootstrap';

import { PlainText } from '../components/Typography';

const TILE_URL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

const AddRegionButton = styled(Button)`
  z-index: 10000;
  position: absolute;
  top: 15px;
  right: 15px;
`;

class MapTool extends Component {
  state = {
    lat: 47.6202,
    lng: -122.3472,
    zoom: 13,
    markers: []
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    const freeDraw = new FreeDraw();

    leafletMap.addLayer(freeDraw);

    freeDraw.mode(CREATE | EDIT);

    leafletMap.on('zoomend', () => {
        window.console.log('Current zoom level -> ', leafletMap.getZoom());
    });
    leafletMap.on('moveend', () => {
      window.console.log('Current map bounds -> ', leafletMap.getCenter());
    });
    leafletMap.on('click', (e) => {
      console.log('Click event -> ', e);
      this.setState({
        markers: [...this.state.markers, { lat: e.latlng.lat, lng: e.latlng.lng }]
      });
    });
  }

  render() {
    const {
      ...rest
    } = this.props;

    const position = [this.state.lat, this.state.lng];
    return (
      <div {...rest}>
        <AddRegionButton>
          Add region
        </AddRegionButton>
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
            map(this.state.markers, (marker, idx) => {
              return (
                <Marker key={idx} position={[marker.lat, marker.lng]}>
                  <Popup>
                    <PlainText>
                      {marker.lat}, {marker.lng}
                    </PlainText>
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
