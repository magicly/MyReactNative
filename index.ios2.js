'use strict';

var React = require('react-native');
var TabBar = require('./TabBar');

import MainList from './MainList';

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    } = React;

const MyReactNative = () => {
    return <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Qiu~~~',
          component: MainList,
        }}/>
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

AppRegistry.registerComponent('MyReactNative', () => MyReactNative);
