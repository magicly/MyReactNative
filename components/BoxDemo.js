/**
 * Created by liyan on 16/3/6.
 */

"use strict";

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    } = React;
//import React, {StyleSheet, View}from 'react-native';

const BoxDemo = () => {
    return <View style={styles.container}>
        <View style={[styles.margin, styles.bgyellow]}><Text>margin</Text></View>
        <View style={[styles.top, styles.h50, styles.bgred]}><Text>top22222</Text></View>
        <View style={styles.center}>
            <View style={[styles.left, styles.w50, styles.bggray]}><Text>left</Text></View>
            <View style={[styles.content]}><Text>element</Text></View>
            <View style={[styles.right, styles.w50, styles.bggray]}><Text>right</Text></View>
        </View>
        <View style={[styles.bottom, styles.h50, styles.bggreen]}><Text>bottom</Text></View>
    </View>
}

export default BoxDemo;


const styles = StyleSheet.create({
    container: {
        top: 100,
        width: 300,
        height: 300,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    h50: {
        height: 50,
    },
    w50: {
        width: 50,
    },
    bgred: {
        backgroundColor: 'red',
    },
    bggreen: {
        backgroundColor: 'green',
    },
    bggray: {
        backgroundColor: 'gray',
    },
    bgyellow: {
        backgroundColor: 'yellow',
    },
    margin: {
        position: 'absolute',
    },
    top: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    left: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: 400,
        height: 400,
    },
});


