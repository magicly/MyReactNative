'use strict';

var React = require('react-native');
var {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    } = React;


// corporate ipsum > lorem ipsum
var alertMessage = 'Credibly reintermediate next-generation potentialities after goal-oriented ' +
    'catalysts for change. Dynamically revolutionize.';

/**
 * Simple alert examples.
 */
var SimpleAlertExampleBlock = React.createClass({

    render: function () {
        return (
            <View>
                <TouchableHighlight style={styles.wrapper}
                                    onPress={() => Alert.alert( 'Alert Title', alertMessage, )}>
                    <View style={styles.button}>
                        <Text>Alert with message and default button</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight style={styles.wrapper}
                                    onPress={() => Alert.alert( 'Alert Title', alertMessage,
            [
              {text: 'OK123', onPress: () => console.log('OK Pressed!')},
            ]
          )}>
                    <View style={styles.button}>
                        <Text>Alert with one button</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.wrapper}
                                    onPress={() => Alert.alert(
            'Alert Title',
            alertMessage,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )}>
                    <View style={styles.button}>
                        <Text>Alert with two buttons</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.wrapper}
                                    onPress={() => Alert.alert(
            'Alert Title',
            'alert message.....',
            [
              {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
              {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
              {text: 'Baz', onPress: () => console.log('Baz Pressed!')},
            ]
          )}>
                    <View style={styles.button}>
                        <Text>Alert with three buttons</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.wrapper}
                                    onPress={() => Alert.alert(
            'Foo Title',
            alertMessage,
            '..............'.split('').map((dot, index) => ({
              text: 'Button ' + index,
              onPress: () => console.log('Pressed ' + index)
            }))
          )}>
                    <View style={styles.button}>
                        <Text>Alert with too many buttons</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    },
});

var AlertExample = React.createClass({
    statics: {
        title: 'Alert',
        description: 'Alerts display a concise and informative message ' +
        'and prompt the user to make a decision.',
    },
    render: function () {
        return (
            <SimpleAlertExampleBlock />
        );
    }
});

var styles = StyleSheet.create({
    wrapper: {
        borderRadius: 5,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#eeeeee',
        padding: 10,
    },
});

module.exports = {
    AlertExample,
    SimpleAlertExampleBlock,
};
