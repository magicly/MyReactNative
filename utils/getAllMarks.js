/**
 * Created by liyan on 16/5/4.
 */
import React from 'react-native';
const {
    Component,
    Image,
    MapView,
    PropTypes,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    } = React;

import Dimensions from 'Dimensions';

import {getDistance} from './getDistance.js';
import {overlapData} from './overLap.js';
import {calculateLat} from './calculateLat.js';

const MARKER_SIZE = 80;
const KM_2_M = 1000;

function getRegion(region) {
    const {nLat, sLat} = calculateLat(region.latitude, region.latitudeDelta);
    let wLng = region.longitude - region.longitudeDelta / 2;
    wLng = wLng < -180 ? wLng + 360 : wLng;
    let eLng = region.longitude + region.longitudeDelta / 2;
    eLng = eLng > 180 ? eLng - 360 : eLng;

    return {
        sLat, wLng, nLat, eLng
    }
}
function getScale({sLat, wLng, nLat, eLng}) {
    const h = Dimensions.get('window').height;
    const w = Dimensions.get('window').width;
    const diagonalDistance = getDistance({
        lat: sLat, long: wLng
    }, {
        lat: nLat,
        long: eLng
    });// km
    const diagonalPixels = Math.sqrt(w * w + h * h);
    const scale = diagonalDistance * KM_2_M / diagonalPixels * MARKER_SIZE;

    return scale;
}

function getUrl({sLat, wLng, nLat, eLng, scale}) {
    const url = `http://capi.fishsaying.com/content_map/mIPs?bottomLeft=${wLng},${sLat}&topRight=${eLng},${nLat}&scale=${scale}`;

    return url;
}
const fetchMips = (region, onFocus, onBlur, onSuccess) => {
    const {sLat, wLng, nLat, eLng} = getRegion(region);
    const h = Dimensions.get('window').height;
    const w = Dimensions.get('window').width;
    const scale = getScale({sLat, wLng, nLat, eLng});

    const url = getUrl({sLat, wLng, nLat, eLng, scale});

    return fetch(url)
        .then(resp => resp.text())
        .then(respText => JSON.parse(respText))
        .then(json => {
            return overlapData(w, h, {lat: nLat, lng: eLng}, {lat: sLat, lng: wLng}, json);
        })
};

export default fetchMips;
