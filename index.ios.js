'use strict';

import React, {Component} from 'react-native'
var TabBar = require('./TabBar');

import MainList from './MainList';
import {WebViewExample} from './components/WebView.js'
import {WebViewExample2} from './components/WebView2.js'
import IndexMap from './components/index/index.js'
import {renderVideo} from './components/Video.js';
import VideoPlayer from './components/VideoDemo.js';
import FlexDemo from './components/FlexDemo.js';
import BoxDemo from './components/BoxDemo.js';
import BoxContainer from './components/BoxDemo2.js';
//import {examples} from './components/MapView.js';
//import {examples} from './components/GeolocationDemo.js';
import CameraDemo from './components/CameraDemo.js';
import CameraApp from './components/QRDemo.js';
import QRCodeScreen from './components/QRCodeScreen.js';
import QRDemo from './components/QRDemo.js';
import BadInstagramCloneApp from './components/BadInstagramCloneApp.js';

import {NativeModules} from 'react-native';
import NativeOCDemo from './components/NativeOCDemo.js';
import MyMapView from './components/MyMap.js';
import codePush from 'react-native-code-push';

import ScenicRegion from './components/scenicRegion/index.js'
import ScenicSpot from './components/scenicSpot/index.js'
import Voice from './components/voice/index.js'
import AppNavigator from './components/AppNavigator.js'
import ModalExample from './components/ModalExample.js'
//import {examples} from './components/ModalExample2.js'
import examples from './components/AnimateDemo.js'
import Playground, {App} from './components/AnimateDemo2.js'
import SwiperExample from './components/SwiperExample.js'

import WebViewDemo from './components/webview/index.js';

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NativeAppEventEmitter,
    requireNativeComponent
    } = React;

const {CalendarManager, CalendarSwift, MCFWriteUtil} = NativeModules;

const MyReactNative = ({name = 'unkonw'}) => {

    //return <App />
    //return <Playground />
    //return examples[1].render();
    //return <QRDemo />
    //return <WebViewDemo url="http://baidu.com" />
    //return <View>
    //    <Text style={{margin: 20, height: 20}} onPress={() => navigator.pop()}>Back</Text>
    //    <WebViewDemo url={router.url} navigator={navigator}/>
    //</View>
    //return <WebViewDemo url="https://www.baidu.com/index.html" />
    return <AppNavigator />;
    return <FlexDemo />
    return <BoxContainer />
    return <BoxDemo />
    //return <WebViewExample/>
    return <SwiperExample />
    return <ModalExample />
    return renderVideo();
    return <VideoPlayer />
    return examples[7].render();
    //return <BadInstagramCloneApp />
    console.log(NativeModules)
    return <ScenicSpot />;
    return <Voice />;
    return <ScenicRegion />;
    return <AComponent />
    codePush.sync();


    //return <BoxDemo />
    //
    return <MyMapView
        style={{height:700}}
        pitchEnabled={true}
        />


    //return (
    //    <View style={styles.container}>
    //        <LinearGradient
    //            style={styles.gradient}
    //            locations={[0, 0.5, 1.0]}
    //            colors={['#5ED2A0', 'red', '#339CB1']}
    //            />
    //        <Text style={styles.text}>
    //            Hello Gradient!
    //        </Text>
    //    </View>
    //);

    //return <LinearGradient
    //    style={{height: 500,
    //position: 'absolute',
    //backgroundColor: '#5ED2A0',
    //top: 20,
    //left: 0,
    //bottom: 0,
    //right: 0,
    //    }}
    //    locations={[0, 0.5, 1.0]}
    //    colors={['#5ED2A0', 'red', '#339CB1']}
    //    />;


    return <NativeOCDemo />;


    //return <View>
    //    <Text>sadfadsfad</Text>
    //    </View>

    console.log('MCFWriteUtil', MCFWriteUtil);
    MCFWriteUtil.writeFile('fileName', 'contents...',
            err => alert(err),
            r => alert('write' + JSON.stringify(r)))
    MCFWriteUtil.readFile('fileName',
            err => alert(err),
            r => alert('read' + JSON.stringify(r)))
    //console.dir(CalendarSwift);
    console.log('CalendarSwift', CalendarSwift);
    CalendarSwift.sayHello('liyan', 19,
        (...result) => console.log('Swift=====', result));

    React.NativeAppEventEmitter.addListener('event from swift', (o) => console.log('event from swift====', o.name, o.age, o.sex));
    console.log('swift constants: ', CalendarSwift.x, CalendarSwift.two, CalendarSwift.z);

    const sub = NativeAppEventEmitter.addListener('this is from native module',
        (param) => console.log('sub', param)
    );
    console.log('CalendarManager', CalendarManager);
    setTimeout(() => CalendarManager.sendEvent('event from js'), 1000);
    console.log('result from oc', CalendarManager.addEvent('name', {
        location: 'location',
        time: new Date().toISOString(),
    }, new Date().toISOString));
    CalendarManager.findEvents((err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log('in js: ', result);
        }
    });

    (async () => {
        try {
            const result = await CalendarManager.findEventsWithPromise();
            console.log('result in async: ' + result);
        } catch (e) {
            console.error(e);
        }
    })();
    CalendarManager.findEventsWithPromise()
        .then((result) => console.log('promise result1', result))
        .catch(error => console.log('promise error', error));

    CalendarManager.doSthExpensive('中文参数', (err, result) => {
        console.log(err, result);
    });
    console.log('firstDay', CalendarManager.firstDay);
    //return examples[0].render();
    //return <BoxContainer />
    //return <QRCodeScreen />
    //return <CameraApp />
    //return <CameraDemo />
    //return examples[0].render();
    return getAnnotation();
};

//const styles = StyleSheet.create({
//    container: {
//        flex: 1
//    },
//});
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    text: {
        color: '#fff',
        fontSize: 30,
        backgroundColor: 'transparent',
    },
});


AppRegistry.registerComponent('MyReactNative', () => MyReactNative);
