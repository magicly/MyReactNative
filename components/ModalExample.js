'use strict';

var React = require('react-native');
var Modal = require('react-native-modal');
var { AppRegistry, StyleSheet, View, Text } = React;

class ModalExample extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false
        };
    }

    openModal() {
        this.setState({isModalOpen: true});
    }

    closeModal() {
        this.setState({isModalOpen: false});
    }

    render() {
        return (
            <View style={styles.page}>
                <Text onPress={() => this.openModal()}>
                    Open Modal.
                </Text>
                <Modal isVisible={this.state.isModalOpen} onClose={() => this.closeModal()}>
                    <Text>Hello world!</Text>
                </Modal>
            </View>
        );
    }
}

export default ModalExample;

var styles = StyleSheet.create({
    page: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 10,
        right: 0,
        top: 10
    }
});
