import { useRef, useCallback, useMemo } from 'react';
import { map } from 'lodash';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import Freedraw, { CREATE, NONE } from 'react-leaflet-freedraw';
import PropTypes from 'prop-types';

export const polygonFromLatLngs = (latLngs) => ({
    type: 'polygon',
    geometry: map(latLngs, (shape) =>
        map(shape, (point) => [point.lat, point.lng])
    ),
});

function currentMode(mode) {
    if (mode === 'CREATE') {
        return CREATE;
    }
    return NONE;
}

function MapTool({ tileURL, tileAttribution, mode, onFeatureDrawn, objects }) {
    const freedrawRef = useRef(null);

    const handleMarkersDraw = useCallback((event) => {
        if (event.eventType !== 'clear') {
            if (event.latLngs !== undefined || event.latLngs.length !== 0) {
                onFeatureDrawn(polygonFromLatLngs(event.latLngs));
                freedrawRef.current.clear();
            }
        }
    }, []);

    const handlers = useMemo(
        () => ({
            markers: handleMarkersDraw,
        }),
        [handleMarkersDraw]
    );

    return (
        <MapContainer
            dragging={false}
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
            zoomControl={false}
            doubleClickZoom={false}
            touchZoom={false}
            tap={false}
            style={{
                height: '100%',
                touchAction: 'none',
            }}
        >
            <TileLayer attribution={tileAttribution} url={tileURL} />
            <Freedraw               
                mode={currentMode(mode)}
                eventHandlers={handlers}
                ref={freedrawRef}
            />
            {map(objects, (object, idx) => (
                <Polygon
                    key={idx}
                    color="#b1ef8d"
                    positions={object.geometry.coordinates}
                />
            ))}
        </MapContainer>
    );
}

MapTool.propTypes = {
    tileURL: PropTypes.string,
    tileAttribution: PropTypes.string,
    onFeatureDrawn: PropTypes.func.isRequired,
    center: PropTypes.array,
    bounds: PropTypes.array,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    zoom: PropTypes.number,
    mode: PropTypes.string.isRequired,
};

MapTool.defaultProps = {
    tileURL:
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png',
    tileAttribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    center: [38.678052, -96.27338],
    zoom: 4,
    bounds: null
};

export default MapTool;
