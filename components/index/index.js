'use strict';

import React from 'react-native';
const {
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
    } = React;


import GaodeMap from './GaodeMap.js'
import ScenicRegionFooter from './ScenicRegionFooter.js'
import ScenicSpotFooter from './ScenicSpotFooter.js'
import VoiceFooter from './VoiceFooter.js'

export default class IndexMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            clicked: {}
        };
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {toValue: 1}
        ).start();
    }

    goto(where, props) {
        this.props.navigator.push({
            name: where,
            ...props
        });
    }

    onFocus = (e) => {
        console.log(e)
        this.setState({
            clicked: {...e, type: 'Voice'}// todo 从e里面获取类型， debug时候手动设置
        })
    }
    onBlur = (e) => {
        this.setState({
            clicked: {}
        })
    }

    getFooter(type) {
        if (type === 'ScenicRegion') {
            return <TouchableOpacity
                onPress={() => this.goto('ScenicRegion', {id: 1234})}
                >
                <View
                    style={styles.footer}
                    >
                    <ScenicRegionFooter
                        imgUrl={this.state.clicked.cover.x80}
                        name={this.state.clicked.title}
                        totalSpot={24}
                        totalStory={240}
                        />
                </View>
            </TouchableOpacity>;
        } else if (type === 'ScenicSpot') {
            return <TouchableOpacity
                onPress={() => this.goto('ScenicSpot', {id: 1234})}
                >
                <View
                    style={styles.footer}
                    >
                    <ScenicSpotFooter
                        imgUrl={this.state.clicked.cover.x80}
                        name={this.state.clicked.title}
                        totalStory={240}
                        />
                </View>
            </TouchableOpacity>;
        } else if (type === 'Voice') {
            return <TouchableOpacity
                onPress={() => this.goto('Voice', {id: 1234})}
                >
                <View
                    style={styles.footer}
                    >
                    <VoiceFooter
                        imgUrl={this.state.clicked.cover.x80}
                        name={this.state.clicked.title}
                        spotRegionName="todo景区"
                        />
                </View>
            </TouchableOpacity>;
        }
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.header}>
                <Text
                    onPress={() => this.goto('MySpace') }
                    >
                    loginx
                </Text>
                <Animated.View style={{opacity: this.state.fadeAnim,
                transform: [{
                    translateX: this.state.fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [150, 0]
                    })
                }]
                }}>
                    <Text style={styles.title}>鱼说</Text>
                </Animated.View>
                <Text>search</Text>
                <Text
                    onPress={() => this.goto('QRCode') }
                    >
                    QRCode
                </Text>
            </View>
            <GaodeMap
                style={styles.map}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                />
            {this.getFooter(this.state.clicked.type)}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    title: {
        flex: 10,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
    }
});
