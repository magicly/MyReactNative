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
//var cssVar = require('cssVar');

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
    _renderScene(router, navigator) {
        switch (router.name) {
            case 'ScenicSpot':
                return <ScenicSpot navigator={navigator}/>;

            case 'ScenicRegion':
                return <ScenicRegion navigator={navigator}/>;
            case 'Voice':
                return <Voice navigator={navigator}/>;
            default:
                return <ScenicRegion navigator={navigator}/>;
        }
    }

    render() {
        return <Navigator
            style={styles.container}
            initialRoute={{name: 'ScenicRegion'}}
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
