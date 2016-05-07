/**
 * Created by liyan on 16/5/4.
 */
'use strict';

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
    Animated,
    } = React;

import Dimensions from 'Dimensions';

import fetchMips from '../../utils/getAllMarks.js';


const MarkerView = ({uri, size}) => {
    const bounceValue = new Animated.Value(0);
    Animated.timing(                          // Base: spring, decay, timing
        bounceValue,                 // Animate `bounceValue`
        {
            toValue: 1,                         // Animate to smaller size
        }
    ).start();                                // Start the animation
    return (
        <Animated.Image                         // Base: Image, Text, View
            style={[styles.marker, {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        //transform: bounceValue.getTranslateTransform()
                        transform: [
                            {scaleX: bounceValue},
                            {scaleY: bounceValue},
                            //{rotateX: '7deg'},
                            //{rotateY: '7deg'},
                        ]
//[                        // `transform` is an ordered array
                          //{scale: bounceValue},  // Map `bounceValue` to `scale`
                        //]
                    }]}
            source={{uri}}
            />
    );
}
export default class GaodeMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annotations: [],
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const initialPosition = JSON.stringify(position);
                // todo 根据5个景点的经纬度计算出范围
                // const FiveScenicsUrl = 'http://capi.fishsaying.com/capi/homepage/fiveScenics?lat=30.577289&lng=104.060103';
                this.setState({initialPosition});
            },
            (error) => console.error(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const lastPosition = JSON.stringify(position);
            //console.log(lastPosition)
            //this.setState({lastPosition});
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    fetchAndSetMips = (region) => {
        console.log('region', region);
        const marker2View = marker => ({
            latitude: marker.location.lat,
            longitude: marker.location.lng,
            onFocus: () => this.props.onFocus(marker),
            onBlur: () => this.props.onBlur(marker),
            id: marker.id,
            view: <MarkerView uri={marker.cover.x80} size={marker.size}/>
        });
        return fetchMips(region)
            .then(markers => {
                const mips = markers.map(marker2View);
                this.setState({annotations: mips});
            })
            .catch(error => {
                console.error(error)
            });
    }

    render() {
        return <MapView
            style={styles.map}
            onRegionChangeComplete={this.fetchAndSetMips}
            rotateEnabled={false}
            annotations={this.state.annotations}
            showsUserLocation={true}
            region={{latitude:30.5, longitude: 104, latitudeDelta: 0.1, longitudeDelta: 0.1}}
            showsPointsOfInterest={false}
            showCompass={false}
            />;
    }
}
const styles = StyleSheet.create({
    map: {
        height: Dimensions.get('window').height - 64,
    },
    marker: {
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'red',
    },
});
