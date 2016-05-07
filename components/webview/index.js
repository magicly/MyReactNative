/**
 *
 * @flow
 */
'use strict';

import React from 'react-native'
const {
    Component,
    Dimensions,
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

var WEBVIEW_REF = 'webview';

export default class WebViewDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log('webview did mount')
    }

    componentWillUnMount() {
        alert('will unmount')
    }

    onLoadStart() {
        console.log('this.onLoadStart');
    }

    onLoadEnd() {
        console.log('this.onLoadEnd');
    }

    onLoad() {
        console.log('this.onLoad');
    }

    onError() {
        console.log('this.onError');
    }

    render() {
        const {url, onNavigationStateChange, onShouldStartLoadWithRequest, scalesPageToFit, status} = this.props;
        console.log('url: ', url)
        return <WebView
            ref={WEBVIEW_REF}
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
            source={{uri: url, method: 'GET'}}
            onLoadStart={this.onLoadStart}
            onLoadEnd={this.onLoadEnd}
            onLoad={this.onLoad}
            onError={this.onError}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            onNavigationStateChange={onNavigationStateChange}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            startInLoadingState={true}
            scalesPageToFit={scalesPageToFit}
            allowsInlineMediaPlayback={true}
            />
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addressBarRow: {
        flexDirection: 'row',
        padding: 8,
    },
    webView: {
        height: Dimensions.get('window').height,
    },
    addressBarTextInput: {
        borderColor: 'transparent',
        borderRadius: 3,
        borderWidth: 1,
        height: 24,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        flex: 1,
        fontSize: 14,
    },
    navButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'transparent',
        borderRadius: 3,
    },
    disabledButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'transparent',
        borderRadius: 3,
    },
    goButton: {
        height: 24,
        padding: 3,
        marginLeft: 8,
        alignItems: 'center',
        borderColor: 'transparent',
        borderRadius: 3,
        alignSelf: 'stretch',
    },
    statusBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        height: 22,
    },
    statusBarText: {
        color: 'white',
        fontSize: 13,
    },
    spinner: {
        width: 20,
        marginRight: 6,
    },
});

