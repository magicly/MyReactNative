'use strict';
import React, {
    AppRegistry,
    Component,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Camera from 'react-native-camera';

export default class CameraDemo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
            this.camera = cam;
          }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fit}
                    flashMode={Camera.constants.FlashMode.on}
                    torchMode={Camera.constants.TorchMode.on}
                    onBarCodeRead={this._onBarCodeRead}
                    >
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                </Camera>
            </View>
        );
    }
    _onBarCodeRead(result) {
       console.log('qr====', result.data);
    }
    takePicture() {
        this.camera.hasFlash()
            .then((data) => console.log('data', data))
            .catch((error) => console.error('error', error));
        Camera.checkDeviceAuthorizationStatus()
            .then((data) => console.log('data2', data))
            .catch((error) => console.error('error2', error));
        this.camera.capture()
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});