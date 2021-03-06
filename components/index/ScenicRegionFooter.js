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

const ScenicRegionFooter = ({imgUrl, name, totalSpot, totalStory}) => {
    return <View style={styles.container}>
        <Image style={styles.image}
               source={{uri: imgUrl}}
            >
        </Image>
        <View style={styles.text}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.totalSpot}>{totalSpot}个景点</Text>
            <Text style={styles.totalStory}>{totalStory}个故事</Text>
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

export default ScenicRegionFooter;
