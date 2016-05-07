/**
 * Created by liyan on 16/3/4.
 */
var React = require('react-native');
var {
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

import Video from 'react-native-video';

export function renderVideo() {
    return <AudioPlayer />
}

export default class AudioPlayer extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            paused: false
        };
    }

    loadStart = (data) => {
        console.log('loadStart...', data);
    }
    setDuration = (data) => {
        console.log('setDuration...', data);
        this.setState({duration: data.duration});
    }
    setTime = (data) => {
        console.log('setTime...', data);
        this.setState({
            currentTime: data.currentTime
        })
    }
    onEnd = (data) => {
        console.log('onEnd...', data);
    }
    videoError = (e) => {
        console.log('videoError...', e);
    }

    render() {
        const completePer = this.state.currentTime / this.state.duration;
        const completed = completePer * 100;
        const remain = (1 - completePer) * 100;
        return <View>
            <Video
                ref={e => this.video = e}
                //source={{uri: "http://cc.stream.qqmusic.qq.com/C200001mZ3iA0naCQ9.m4a?vkey=7D96E4126A845352AA9A365F161A5C39B05B6F768CE63C4573308D5BA6AABC185FC67784AE0C4CF62B38B0B9F8B09746CAA4DCF8E46F59E7&guid=6887410544&fromtag=30"}} // Can be a URL or a local file.
                source={{uri: this.props.uri}}
                rate={1.0}                   // 0 is paused, 1 is normal.
                volume={1.0}                 // 0 is muted, 1 is normal.
                muted={false}                // Mutes the audio entirely.
                paused={this.state.paused}               // Pauses playback entirely.
                resizeMode="cover"           // Fill the whole screen at aspect ratio.
                repeat={false}                // Repeat forever.
                onLoadStart={this.loadStart} // Callback when video starts to load
                onLoad={this.setDuration}    // Callback when video loads
                onProgress={this.setTime}    // Callback every ~250ms with currentTime
                onEnd={this.onEnd}           // Callback when playback finishes
                onError={this.videoError}    // Callback when video cannot be loaded
                style={styles.backgroundVideo}
                />
            <Text
                style={styles.button}
                onPress={()=> this.setState({paused: !this.state.paused})}
                >
                {this.state.paused ? 'play' : 'pause'}
            </Text>
            <Text>
                {this.state.currentTime} / {this.state.duration}
            </Text>
            <View style={styles.progress}>
                <View style={[styles.completed, {flex: completed}]}>
                </View>
                <View style={[styles.remain, {flex: remain}]}>
                </View>
            </View>
            <Text onPress={() => {this.video.seek(205);}}>Go to End</Text>
        </View>
    }
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
    button: {
        borderRadius: 5,
        borderWidth: 1,
        margin: 20
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
    },
    completed: {
        height: 20,
        backgroundColor: 'gray',
    },
    remain: {
        height: 20,
        backgroundColor: 'green',
    }
});

