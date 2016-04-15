/**
 * Created by liyan on 16/3/4.
 */
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

import Video from 'react-native-video';

export function renderVideo() {
    return <Video source={{uri: "http://dl.stream.qqmusic.qq.com/C2000019NOaB45ivST.m4a?vkey=BE14C87D3D044D099B763613EC0FA9AEE906E655E4D5D3E36800714BCB61672ED48960B20D23CB39FD1CE20D16B92D16D06499E2CE2C5699&guid=6887410544&fromtag=30"}} // Can be a URL or a local file.
                  rate={1.0}                   // 0 is paused, 1 is normal.
                  volume={1.0}                 // 0 is muted, 1 is normal.
                  muted={false}                // Mutes the audio entirely.
                  paused={false}               // Pauses playback entirely.
                  resizeMode="cover"           // Fill the whole screen at aspect ratio.
                  repeat={true}                // Repeat forever.
                  onLoadStart={this.loadStart} // Callback when video starts to load
                  onLoad={this.setDuration}    // Callback when video loads
                  onProgress={this.setTime}    // Callback every ~250ms with currentTime
                  onEnd={this.onEnd}           // Callback when playback finishes
                  onError={this.videoError}    // Callback when video cannot be loaded
                  style={styles.backgroundVideo}/>
}

// Later on in your styles..
var styles = StyleSheet.create({
    backgroundVideo: {
        height: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

