/**
 * Created by liyan on 16/4/26.
 */

'use strict';
import React, {
    AppRegistry,
    Component,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Camera from 'react-native-camera';

export default class BadInstagramCloneApp extends Component {
    barRead(result) {
        console.log(result, result.data)
    }

    render() {
        Camera.checkDeviceAuthorizationStatus()
            .then(data => console.log(data));
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
            this.camera = cam;
          }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fit}
                    captureMode={Camera.constants.CaptureMode.still}
                    captureQuality={Camera.constants.CaptureQuality.high}
                    type={Camera.constants.Type.back}
                    orientation={Camera.constants.Orientation.auto}
                    onBarCodeRead={this.barRead}
                    mirrorImage={true}
                    >
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                    <Image style={{height: 20, width:20}}
                           source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                        />
                </Camera>
            </View>
        );
    }

    takePicture() {
        this.camera.capture({
            rotation: 10
        })
            .then((data) => console.log(data))
            .catch(err => console.error(err));
        this.camera.getFOV()
            .then(data => console.log(data))
            .catch(err => console.error(err));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height / 2,
        width: Dimensions.get('window').width / 2,
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
