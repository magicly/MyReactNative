/**
 * Created by liyan on 16/4/25.
 */
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
    TouchableNativeFeedback
    } = React;

import ScenicRegion from './scenicRegion/index.js'
import ScenicSpot from './scenicSpot/index.js'
import Voice from './voice/index.js'
import IndexMap from './index/index.js'
import MySpace from './mySpace/index.js'
import QRCodeScreen from './QRCodeScreen.js';
import WebViewDemo from './webview/index.js';

var NavigationBarRouteMapper = {

    LeftButton: function (route, navigator, index, navState) {
        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}
                style={styles.navBarLeftButton}>
                <Text style={[styles.navBarText, styles.navBarButtonText]}>
                    {'<'}
                </Text>
            </TouchableOpacity>
        );
    },

    RightButton: function (route, navigator, index, navState) {
        return null;
    },

    Title: function (route, navigator, index, navState) {
        return null;
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title} [{index}]
            </Text>
        );
    },

};
class AppNavigator extends Component {
    onSucess(result) {
        console.log(result);
    }

    _renderScene(router, navigator) {
        switch (router.name) {
            case 'Index':
                return <IndexMap navigator={navigator}/>;
            case 'MySpace':
                return <MySpace navigator={navigator}/>;
            case 'QRCode':
                return <QRCodeScreen
                    cancelButtonVisible={true}
                    onSucess={(data) => {
                        navigator.replace({
                        name: 'WebView',
                        url: data
                        })
                    }}
                    navigator={navigator}
                    />;
            case 'WebView':
                console.log(router.url)
                return <View>
                    <Text style={{margin: 20, height: 20}} onPress={() => navigator.pop()}>Back</Text>
                    <WebViewDemo url={router.url} navigator={navigator}/>
                    </View>
            case 'ScenicSpot':
                return <ScenicSpot navigator={navigator}/>;
            case 'ScenicRegion':
                return <ScenicRegion navigator={navigator} {...router} />;
            case 'Voice':
                return <Voice navigator={navigator}/>;
            default:
                return <IndexMap navigator={navigator}/>;
        }
    }

    render() {
        return <Navigator
            style={styles.container}
            initialRoute={{name: 'Index'}}
            renderScene={this._renderScene}
            />;
    }
}


const styles = StyleSheet.create({
    container: {},
    navBarLeftButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    messageText: {
        fontSize: 17,
        fontWeight: '500',
        padding: 15,
        marginTop: 50,
        marginLeft: 15,
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CDCDCD',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
    },
    navBar: {
        backgroundColor: 'white',
    },
    navBarText: {
        fontSize: 16,
        marginVertical: 10,
    },
    navBarTitleText: {
        //color: cssVar('fbui-bluegray-60'),
        fontWeight: '500',
        marginVertical: 9,
    },
    navBarLeftButton: {
        paddingLeft: 10,
    },
    navBarRightButton: {
        paddingRight: 10,
    },
    navBarButtonText: {
        //color: cssVar('fbui-accent-blue'),
    },
    scene: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#EAEAEA',
    },
});


export default AppNavigator;
