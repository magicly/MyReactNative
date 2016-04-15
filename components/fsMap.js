'use strict';

import React from 'react-native';
const {
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
import PixelRatio from 'PixelRatio';

import {getDistance} from '../utils/getDistance.js';
import {overlapData} from '../utils/overLap.js';
import {calculateLat} from '../utils/calculateLat.js';

var AnnotationExample = React.createClass({


    fetchMips (region) {
        const mips = [];
        console.log(region)
        //const sLat = region.latitude - region.latitudeDelta / 2;
        //let nLat = region.latitude + region.latitudeDelta / 2;
        //nLat = nLat > 85 ? 85 : nLat;
        const {nLat, sLat} = calculateLat(region.latitude, region.latitudeDelta);
        let wLng = region.longitude - region.longitudeDelta / 2;
        wLng = wLng < -180 ? wLng + 360 : wLng;
        let eLng = region.longitude + region.longitudeDelta / 2;
        eLng = eLng > 180 ? eLng - 360 : eLng;
        console.log(sLat, wLng, nLat, eLng);
        const h = Dimensions.get('window').height;
        const w = Dimensions.get('window').width;
        const scale = getDistance({lat: sLat, long: wLng}, {
                lat: nLat,
                long: eLng
            }) * 1000 / Math.sqrt(w * w + h * h) * 80;
        const url = `http://capi.fishsaying.com/content_map/mIPs?bottomLeft=${wLng},${sLat}&topRight=${eLng},${nLat}&scale=${scale}`;
        console.log(url, PixelRatio.get());
        fetch(url)
            .then(resp => resp.text())
            .then(respText => JSON.parse(respText))
            .then(json => {
                return overlapData(w, h, {lat: nLat, lng: eLng}, {lat: sLat, lng: wLng}, json);
            })
            .then(json => {
                const Scale = 1 / PixelRatio.get();
                const BigSize = 72 * Scale;
                const MiddleSize = 54 * Scale;
                const SmallSize = 36 * Scale;
                const DotSize = 10 * Scale;
                if (json.errCode) {
                    return;
                }
                //console.log(json)
                json.forEach(e => {
                    //image: {uri: e.cover.x80}
                    let size = 0;
                    if (e.display === 'big') {
                        size = BigSize;
                    } else if (e.display === 'middle') {
                        size = MiddleSize;
                    } else if (e.display === 'small') {
                        size = SmallSize;
                    } else if (e.display === 'dot') {
                        size = DotSize;
                    }
                    //size = size === 0 ? SmallSize : size;
                    console.log(e, 'size', size);
                    mips.push({
                        latitude: e.location.lat,
                        longitude: e.location.lng,
                        view: <View
                            style={{
                                    alignItems: 'center',
                                    }}>
                            <Image
                                key={e.id}
                                style={{width: size, height: size, resizeMode: 'cover', borderRadius: size / 2}}
                                source={{uri: e.cover.x80}}
                                />
                        </View>,
                    })
                });
                //<Image
                //    style={{width: 30, height: 30, resizeMode: 'cover'}}
                //    source={{uri: 'http://cdn.duitang.com/uploads/item/201511/28/20151128081816_U3kcu.thumb.700_0.jpeg'}}
                //    />
            })
            .then(() => {
                this.setState({annotations: mips});
            })
            .catch(error => {
                console.error(error)
            });
    },
    getInitialState() {
        return {
            isFirstLoad: true,
            annotations: [],
            mapRegion: undefined,
        };
    },

    render() {
        if (this.state.isFirstLoad) {
            var onRegionChangeComplete = (region) => {
                this.fetchMips(region);
            };
        }

        return <MapView
            style={styles.map}
            onRegionChangeComplete={onRegionChangeComplete}
            rotateEnabled={false}
            region={this.state.mapRegion}
            annotations={this.state.annotations}
            mapType='standard'
            showsUserLocation={true}
            region={{latitude:30, longitude: 104, latitudeDelta: 100, longitudeDelta: 100}}
            />;
    }
});


export function getAnnotation() {
    return <AnnotationExample style={styles.map}/>;
}

var styles = StyleSheet.create({
    map: {
        height: Dimensions.get('window').height - 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#000000',
    },
});
