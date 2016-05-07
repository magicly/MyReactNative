'use strict';

const React = require('react-native');
const {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Navigator,
    } = React;

var QRCodeScreen = require('./QRCodeScreen');

const CameraApp = () => {
    const renderScene = (router, navigator) => {
        switch (router.name) {
            case 'Index':
                return <Index navigator={navigator}/>;
            case 'QRCodeScreen':
                return <QRCodeScreen
                    onSucess={router.onSucess}
                    cancelButtonVisible={router.cancelButtonVisibl}
                    navigator={navigator}
                    />;
        }
    }
    return (
        <Navigator
            style={styles.container}
            initialRoute={{
          name: 'Index',
        }}
            renderScene={renderScene}
            />
    );
};

const Index = ({navigator}) => {
    const onPressQRCode = () => {
        navigator.push({
            name: 'QRCodeScreen',
            title: 'QRCode',
            onSucess: onSucess,
            cancelButtonVisible: true,
        });
    };

    const onSucess = (result) => {
        console.log(result);
    };
    return (
        <View style={styles.contentContainer}>
            <TouchableOpacity onPress={onPressQRCode}>
                <Text>Read QRCode</Text>
            </TouchableOpacity>
        </View>
    );
};

module.exports = CameraApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
