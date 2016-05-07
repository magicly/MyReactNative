/**
 * Created by liyan on 16/4/28.
 */
import React from 'react-native'
const {
    Component,
    Image,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback
    } = React;

class MySpace extends Component {
    render() {
        return <View style={styles.container}>
            <Text
                style={styles.close}
                onPress={() => {this.props.navigator.pop()}}
                >
                X
            </Text>
            <Text style={styles.todo}>todo</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    close: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    todo: {
        margin: 20,
    }
});


export default MySpace;
