/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
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
//import {calculateLat} from '../utils/calculateLat.js';

var regionText = {
    latitude: '0',
    longitude: '0',
    latitudeDelta: '0',
    longitudeDelta: '0',
};

var MapRegionInput = React.createClass({

    propTypes: {
        region: PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            latitudeDelta: PropTypes.number,
            longitudeDelta: PropTypes.number,
        }),
        onChange: PropTypes.func.isRequired,
    },

    getInitialState() {
        return {
            region: {
                latitude: 0,
                longitude: 0,
            }
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            region: nextProps.region || this.getInitialState().region
        });
    },

    render: function () {
        var region = this.state.region || this.getInitialState().region;
        const {calculateLat} = require('../utils/calculateLat.js');
        const {nLat, sLat} = calculateLat(region.latitude, region.latitudeDelta);
        console.log(region, nLat, sLat)
        //const nLat = region.latitude + region.latitudeDelta / 2;
        //const sLat = region.latitude - region.latitudeDelta / 2;
        console.log('nLat', nLat, 'sLat', sLat)
        const y = e => Math.log(Math.tan((45 + e / 2) / 180 * Math.PI))
        console.log('diff', y(nLat) - y(sLat));
        return (
            <View>
                <View style={styles.row}>
                    <Text>
                        {'Latitude'}
                    </Text>
                    <TextInput
                        value={'' + region.latitude}
                        style={styles.textInput}
                        onChange={this._onChangeLatitude}
                        selectTextOnFocus={true}
                        />
                </View>
                <View style={styles.row}>
                    <Text>
                        {'Longitude'}
                    </Text>
                    <TextInput
                        value={'' + region.longitude}
                        style={styles.textInput}
                        onChange={this._onChangeLongitude}
                        selectTextOnFocus={true}
                        />
                </View>
                <View style={styles.row}>
                    <Text>
                        {'Latitude delta'}
                    </Text>
                    <TextInput
                        value={
              region.latitudeDelta == null ? '' : String(region.latitudeDelta)
            }
                        style={styles.textInput}
                        onChange={this._onChangeLatitudeDelta}
                        selectTextOnFocus={true}
                        />
                </View>
                <View style={styles.row}>
                    <Text>
                        {'Longitude delta'}
                    </Text>
                    <TextInput
                        value={
              region.longitudeDelta == null ? '' : String(region.longitudeDelta)
            }
                        style={styles.textInput}
                        onChange={this._onChangeLongitudeDelta}
                        selectTextOnFocus={true}
                        />
                </View>
                <View style={styles.changeButton}>
                    <Text onPress={this._change}>
                        {'Change'}
                    </Text>
                </View>
            </View>
        );
    },

    _onChangeLatitude: function (e) {
        regionText.latitude = e.nativeEvent.text;
    },

    _onChangeLongitude: function (e) {
        regionText.longitude = e.nativeEvent.text;
    },

    _onChangeLatitudeDelta: function (e) {
        regionText.latitudeDelta = e.nativeEvent.text;
    },

    _onChangeLongitudeDelta: function (e) {
        regionText.longitudeDelta = e.nativeEvent.text;
    },

    _change: function () {
        //console.log('change')
        //this.setState({
        const region = {
            latitude: parseFloat(regionText.latitude),
            longitude: parseFloat(regionText.longitude),
            latitudeDelta: parseFloat(regionText.latitudeDelta),
            longitudeDelta: parseFloat(regionText.longitudeDelta),
        };
        //});
        this.props.onChange(region);
    },

});

var MapViewExample = React.createClass({
    getInitialState() {
        return {
            isFirstLoad: true,
            mapRegion: undefined,
            mapRegionInput: undefined,
            annotations: [],
        };
    },

    render() {
        //console.log('render' +JSON.stringify(this.state.mapRegion) + JSON.stringify(this.state.mapRegionInput))
        return (
            <View>
                <MapView
                    style={styles.map}
                    onRegionChange={this._onRegionChange}
                    onRegionChangeComplete={this._onRegionChangeComplete}
                    region={this.state.mapRegion}
                    annotations={this.state.annotations}
                    showsCompass={true}
                    />
                <MapRegionInput
                    onChange={this._onRegionInputChanged}
                    region={this.state.mapRegionInput}
                    />
            </View>
        );
    },

    _getAnnotations(region) {
        return [{
            longitude: region.longitude,
            latitude: region.latitude,
            title: 'You Are Here',
        }];
    },

    _onRegionChange(region) {
        this.setState({
            mapRegionInput: region,
        });
    },

    _onRegionChangeComplete(region) {
        if (this.state.isFirstLoad) {
            this.setState({
                mapRegionInput: region,
                annotations: this._getAnnotations(region),
                isFirstLoad: false,
            });
        }
    },

    _onRegionInputChanged(region) {
        //console.log('_onRegionInputChanged' + JSON.stringify(region))
        this.setState({
            mapRegion: region,
            mapRegionInput: region,
            annotations: this._getAnnotations(region),
        });
    },

});

var AnnotationExample = React.createClass({


    fetchMips (region) {
        const mips = [];
        console.log(region)
        const sLat = region.latitude - region.latitudeDelta / 2;
        let nLat = region.latitude + region.latitudeDelta / 2;
        nLat = nLat > 90 ? 90 : nLat;
        const wLng = region.longitude - region.longitudeDelta / 2;
        const eLng = region.longitude + region.longitudeDelta / 2;
        console.log(sLat, wLng, nLat, eLng);
        const h = Dimensions.get('window').height;
        const w = Dimensions.get('window').width;
        const scale = getDistance({lat: sLat, long: wLng}, {lat: nLat, long: eLng}) * 1000 / Math.sqrt(w * w + h * h) * 80;
        const url = `http://capi.fishsaying.com/content_map/mIPs?bottomLeft=${wLng},${sLat}&topRight=${eLng},${nLat}&scale=${scale}`;
        console.log(url, PixelRatio.get());
        fetch(url)
            .then(resp => resp.text())
            .then(respText => JSON.parse(respText))
            .then(json => {
                if (json.errCode) {
                    return;
                }
                //console.log(json)
                json.forEach(arr => {
                    arr.forEach(e => {
                        //image: {uri: e.cover.x80}
                        mips.push({
                            latitude: e.location.lat,
                            longitude: e.location.lng,
                            view: <View style={{
                                alignItems: 'center',
                                }}>
                                <Image
                                    style={{width: 80 / PixelRatio.get(), height: 80 / PixelRatio.get(), resizeMode: 'cover', borderRadius: 40 / PixelRatio.get()}}
                                    source={{uri: e.cover.x80}}
                                    />
                            </View>,
                        })
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
                //this.setState({
                //    isFirstLoad: false,
                //    annotations: [{
                //        longitude: region.longitude,
                //        latitude: region.latitude,
                //        ...this.props.annotation,
                //    }, {
                //        longitude: region.longitude + 0.01,
                //        latitude: region.latitude + 0.01,
                //        ...this.props.annotation
                //    }],
                //});

            };
        }

        //console.log(this.state.annotations)

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


exports.displayName = (undefined:
? string
)
;
exports.title = '<MapView>';
exports.description = 'Base component to display maps';
exports.examples = [
    {
        title: 'Map',
        render() {
            return <MapViewExample />;
        }
    },
    {
        title: 'showsUserLocation + followUserLocation',
        render() {
            return (
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    followUserLocation={true}
                    />
            );
        }
    },
    {
        title: 'Callout example',
        render() {
            return <AnnotationExample style={styles.map} annotation={{
        title: 'More Info...',
        rightCalloutView: (
          <TouchableOpacity
            onPress={() => {
              alert('You Are Here');
            }}>
            <Image
              style={{width:10, height:10}}
              source={require('../ios/MyReactNative/Images.xcassets/uie_thumb_selected.imageset/uie_thumb_selected@2x.png')}
            />
          </TouchableOpacity>
        ),
      }}/>;
        }
    },
    {
        title: 'Draggable pin',
        render() {
            return <AnnotationExample style={styles.map} annotation={{
        draggable: true,
        onDragStateChange: (event) => {
          console.log('Drag state: ' + event.state);
        },
      }}/>;
        }
    },
    {
        title: 'Custom pin color',
        render() {
            return <AnnotationExample style={styles.map} annotation={{
        title: 'You Are Purple',
        tintColor: MapView.PinColors.PURPLE,
      }}/>;
        }
    },
    {
        title: 'Custom pin image',
        render() {
            return <AnnotationExample style={styles.map} annotation={{
        title: 'Thumbs Up!',
        image: require('../ios/MyReactNative/Images.xcassets/uie_thumb_selected.imageset/uie_thumb_selected@2x.png')
      }}/>;
        }
    },
    {
        title: 'Custom pin view',
        render() {
            return <AnnotationExample style={styles.map} annotation={{
        title: 'Thumbs Up!123',
        subtitle: 'subtitle Up!',
        view: <View style={{
          alignItems: 'center',
        }}>
          <Text style={{fontWeight: 'bold', color: '#f007'}}>
            Thumbs Up!123
          </Text>
          <Image
            style={{width: 30, height: 30, resizeMode: 'cover'}}
            source={{uri: 'http://cdn.duitang.com/uploads/item/201511/28/20151128081816_U3kcu.thumb.700_0.jpeg'}}
          />
        </View>,
      }}/>;
        }
    },
    {
        title: 'Custom overlay',
        render() {
            return <MapView
                style={styles.map}
                region={{
          latitude: 34.06,
          longitude: 95.22,
        }}
                overlays={[{
          coordinates:[
            {latitude: 32.47, longitude: -107.85},
            {latitude: 45.13, longitude: -94.48},
            {latitude: 39.27, longitude: -83.25},
            {latitude: 32.47, longitude: -107.85},
          ],
          strokeColor: '#f007',
          lineWidth: 3,
        }]}
                />;
        }
    },
];

var styles = StyleSheet.create({
    map: {
        height: Dimensions.get('window').height - 200,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#000000',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInput: {
        width: 150,
        height: 20,
        borderWidth: 0.5,
        borderColor: '#aaaaaa',
        fontSize: 13,
        padding: 4,
    },
    changeButton: {
        alignSelf: 'center',
        marginTop: 5,
        padding: 3,
        borderWidth: 0.5,
        borderColor: '#777777',
    },
});
