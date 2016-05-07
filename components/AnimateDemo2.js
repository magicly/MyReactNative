/**
 * Created by liyan on 16/5/5.
 */
'use strict';

import React from 'react-native';
const {
    Easing,
    Component,
    Image,
    MapView,
    PropTypes,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Animated,
    LayoutAnimation,
    } = React;

var Playground = () => {
    const bounceValue = new Animated.Value(1.5);
    Animated.spring(                          // Base: spring, decay, timing
        bounceValue,                 // Animate `bounceValue`
        {
            toValue: 0.5,                         // Animate to smaller size
            friction: 1,                          // Bouncier spring
            tension: 6,
        }
    ).start();                                // Start the animation
    return (
        <Animated.Image                         // Base: Image, Text, View
            source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
            style={{
          flex: 1,
          transform: [                        // `transform` is an ordered array
            {scale: bounceValue},  // Map `bounceValue` to `scale`
          ]
        }}
            />
    );
}
export default Playground ;

export class Playground2 extends React.Component {
    constructor(props:any) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1.5),
        };
    }

    render():ReactElement {
        return (
            <Animated.Image                         // Base: Image, Text, View
                source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
                style={{
          flex: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
          ]
        }}
                />
        );
    }

    componentDidMount() {
        //this.state.bounceValue.setValue(1.5);     // Start large
        Animated.spring(                          // Base: spring, decay, timing
            this.state.bounceValue,                 // Animate `bounceValue`
            {
                toValue: 0.5,                         // Animate to smaller size
                friction: 1,                          // Bouncier spring
                tension: 6,
            }
        ).start();                                // Start the animation
    }
}

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {w: 100, h: 100};
        this._onPress = this._onPress.bind(this);
    }

    componentWillMount() {
        // Animate creation
        //LayoutAnimation.spring();
    }

    _onPress() {
        // Animate the update
        //LayoutAnimation.spring();
        this.setState({w: this.state.w + 15, h: this.state.h + 15})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.box, {width: this.state.w, height: this.state.h}]}/>
                <TouchableOpacity onPress={this._onPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Press me!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'red'
    }
});
