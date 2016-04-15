'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    AlertIOS,
    } = React;


exports.framework = 'React';
exports.title = 'AlertIOS';
exports.description = 'iOS alerts and action sheets';
exports.examples = [
    {
        title: 'Prompt Options',
        render(): React.Component {
            return <PromptOptions />;
        }
    },
    {
        title: 'Prompt Types',
        render() {
            return (
                <View>
                    <TouchableHighlight
                        style={styles.wrapper}
                        onPress={() => AlertIOS.prompt('Plain Text Entry')}>

                        <View style={styles.button}>
                            <Text>
                                plain-text
                            </Text>
                        </View>

                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.wrapper}
                        onPress={() => AlertIOS.prompt('Secure Text', null, null, 'secure-text')}>

                        <View style={styles.button}>
                            <Text>
                                secure-text
                            </Text>
                        </View>

                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.wrapper}
                        onPress={() => AlertIOS.prompt('Login & Password', null, null, 'login-password')}>

                        <View style={styles.button}>
                            <Text>
                                login-password
                            </Text>
                        </View>

                    </TouchableHighlight>
                </View>
            );
        }
    }];

class PromptOptions extends React.Component {
    constructor(props) {
        super(props);

        this.saveResponse = this.saveResponse.bind(this);

        this.customButtons = [{
            text: 'Custom OK',
            onPress: this.saveResponse,
            style: 'ok',
        }, {
            text: 'Custom Cancel',
            style: 'cancel',
        }];

        this.state = {
            promptValue: undefined,
        };
    }

    render() {
        return (
            <View>
                <Text style={{marginBottom: 10}}>
                    <Text style={{fontWeight: 'bold'}}>Prompt value:</Text> {this.state.promptValue}
                </Text>

                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => AlertIOS.prompt('Type a value', null, this.saveResponse)}>

                    <View style={styles.button}>
                        <Text>
                            prompt with title & callback
                        </Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => AlertIOS.prompt('Type a value', null, this.customButtons)}>

                    <View style={styles.button}>
                        <Text>
                            prompt with title & custom buttons
                        </Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => AlertIOS.prompt('Type a value', null, this.saveResponse, undefined, 'Default value')}>

                    <View style={styles.button}>
                        <Text>
                            prompt with title, callback & default value
                        </Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.wrapper}
                    onPress={() => AlertIOS.prompt('Type a value', null, this.customButtons, 'secure-text', 'admin@site.com')}>

                    <View style={styles.button}>
                        <Text>
                            prompt with title, custom buttons, login/password & default value
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    saveResponse(promptValue) {
        this.setState({promptValue: JSON.stringify(promptValue)});
    }
}

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
