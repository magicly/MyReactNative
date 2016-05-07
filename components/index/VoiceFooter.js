/**
 * Created by liyan on 16/4/29.
 */
/**
 *
 * @flow
 */
'use strict';

import React from 'react-native'
const {
    Component,
    Navigator,
    Image,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
    WebView
    } = React;

import AudioPlayer from '../Video.js'

const VoiceFooter = ({imgUrl,  name, spotRegionName}) => {
    const voiceUrl = "http://cc.stream.qqmusic.qq.com/C2000009OCFa0duN0S.m4a?vkey=442F09CC52FF8448EE4A20629F861C443067C0A648070A5AF4558DA2B1B2E43BF223444F488B820511A368A04F4647231117F86770040BA3&guid=6887410544&fromtag=30";
    return <View style={styles.container}>
        <Image style={styles.image}
               source={{uri: imgUrl}}
            >
        </Image>
        <View style={styles.text}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.spotRegionName}>{spotRegionName}</Text>
            <AudioPlayer uri={voiceUrl}/>
            <Text
                style={styles.play}
                >
                play
            </Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 2,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 1,
        backgroundColor: 'white',
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        flex: 1
    },
});

export default VoiceFooter;
