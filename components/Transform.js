'use strict';

var React = require('react-native');
var {
    Animated,
    Easing,
    StyleSheet,
    Text,
    View,
    Button
    } = React;
var UIExplorerButton = Text;

exports.framework = 'React';
exports.title = 'Animated - Examples';
exports.description = 'Animated provides a powerful ' +
    'and easy-to-use API for building modern, ' +
    'interactive user experiences.';

exports.examples = [
    {
        title: 'FadeInView',
        description: 'Uses a simple timing animation to ' +
        'bring opacity from 0 to 1 when the component ' +
        'mounts.',
        render: function() {
            class FadeInView extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        fadeAnim: new Animated.Value(0), // opacity 0
                    };
                }
                componentDidMount() {
                    Animated.timing(       // Uses easing functions
                        this.state.fadeAnim, // The value to drive
                        {
                            toValue: 1,        // Target
                            duration: 2000,    // Configuration
                        },
                    ).start();             // Don't forget start!
                }
                render() {
                    return (
                        <Animated.View   // Special animatable View
                            style={{
                opacity: this.state.fadeAnim,  // Binds
                transform: [{
                    translateX: this.state.fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 100],
                    })
                }, {
                    scale: this.state.fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                    })
                }]
              }}>
                            {this.props.children}
                        </Animated.View>
                    );
                }
            }
            class FadeInExample extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        show: true,
                    };
                }
                render() {
                    return (
                        <View style={{margin: 100}} >
                            <UIExplorerButton onPress={() => {
                  this.setState((state) => (
                    {show: !state.show}
                  ));
                }}>
                                <Text>
                                Press to {this.state.show ?
                                'Hide' : 'Show'}
                                    </Text>
                            </UIExplorerButton>
                            {this.state.show && <FadeInView>
                                <View style={styles.content}>
                                    <Text>FadeInView</Text>
                                </View>
                            </FadeInView>}
                        </View>
                    );
                }
            }
            return <FadeInExample />;
        },
    },
    {
        title: 'Transform Bounce',
        description: 'One `Animated.Value` is driven by a ' +
        'spring with custom constants and mapped to an ' +
        'ordered set of transforms.  Each transform has ' +
        'an interpolation to convert the value into the ' +
        'right range and units.',
        render: function() {
            this.anim = this.anim || new Animated.Value(0);
            return (
                <View style={{margin: 100}} >
                    <UIExplorerButton onPress={() => {
            Animated.spring(this.anim, {
              toValue: 0,   // Returns to the start
              velocity: 2,  // Velocity makes it move
              tension: 20, // Slow
              friction: 1,  // Oscillate a lot
            }).start(); }}>
                        Press to Fling it!
                    </UIExplorerButton>
                    <Animated.View
                        style={[styles.content, {
              transform: [   // Array order matters
                {scale: this.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 4],
                })},
                {translateX: this.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 50],
                })},
                {rotate: this.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    '0deg', '360deg' // 'deg' or 'rad'
                  ],
                })},
              ]}
            ]}>
                        <Text>Transforms!</Text>
                    </Animated.View>
                </View>
            );
        },
    },
    {
        title: 'Composite Animations with Easing',
        description: 'Sequence, parallel, delay, and ' +
        'stagger with different easing functions.',
        render: function() {
            this.anims = this.anims || [1,2,3].map(
                    () => new Animated.Value(0)
                );
            return (
                <View style={{margin: 100}} >
                    <UIExplorerButton onPress={() => {
            var timing = Animated.timing;
            Animated.sequence([ // One after the other
              timing(this.anims[0], {
                toValue: 200,
                easing: Easing.linear,
              }),
              Animated.delay(400), // Use with sequence
              timing(this.anims[0], {
                toValue: 0,
                easing: Easing.elastic(2), // Springy
              }),
              Animated.delay(400),
              Animated.stagger(200,
                this.anims.map((anim) => timing(
                  anim, {toValue: 200}
                )).concat(
                this.anims.map((anim) => timing(
                  anim, {toValue: 0}
                ))),
              ),
              Animated.delay(400),
              Animated.parallel([
                Easing.inOut(Easing.quad), // Symmetric
                Easing.back(1.5),  // Goes backwards first
                Easing.ease        // Default bezier
              ].map((easing, ii) => (
                timing(this.anims[ii], {
                  toValue: 320, easing, duration: 3000,
                })
              ))),
              Animated.delay(400),
              Animated.stagger(200,
                this.anims.map((anim) => timing(anim, {
                  toValue: 0,
                  easing: Easing.bounce, // Like a ball
                  duration: 2000,
                })),
              ),
            ]).start(); }}>
                        Press to Animate
                    </UIExplorerButton>
                    {['Composite', 'Easing', 'Animations!'].map(
                        (text, ii) => (
                            <Animated.View
                                key={text}
                                style={[styles.content, {
                  right: this.anims[ii]
                }]}>
                                <Text>{text}</Text>
                            </Animated.View>
                        )
                    )}
                </View>
            );
        },
    },
    {
        title: 'Continuous Interactions',
        description: 'Gesture events, chaining, 2D ' +
        'values, interrupting and transitioning ' +
        'animations, etc.',
        render: () => (
            <Text>Checkout the Gratuitous Animation App!</Text>
        ),
    }
];

var styles = StyleSheet.create({
    content: {
        backgroundColor: 'blue',
        borderWidth: 1,
        borderColor: 'red',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
});
