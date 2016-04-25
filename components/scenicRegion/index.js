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

const Spot = ({_id, title, cover, voice_total, voices, navigator}) => {
    const toSpot = () => {
        navigator.push({name: 'ScenicSpot', spotId: _id});
    }
    return <View>
        <TouchableOpacity
            onPress={toSpot}
            >
            <Image style={{margin: 10, height: 100}}
                   source={{uri:cover.source}}
                >
                <Text style={styles.spotTitle}>{title}</Text>

                <Text style={styles.spotTotal}>{voice_total}个故事 ></Text>
            </Image>
        </TouchableOpacity>
        <View style={styles.voiceContainer}>
            {voices.map(voice => {
                return <View style={styles.voice} key={voice._id}
                    >
                    <Image style={styles.voiceImage}
                           source={{uri: voice.cover.source + '@24w_24h'}}
                        />
                    <Text style={styles.voiceText}
                          onPress={() => console.log('text')}
                        >
                        {voice.title}
                    </Text>
                </View>
            })}
        </View>
    </View>;
};

const PureScenicRegion = ({regionName, regionImg, guideImg, spotsInfo, navigator}) => {
    let tmp;
    if (true) {
        tmp  = <Image
            style={styles.spotImg}
            source={{uri:spotsInfo.map_image}}
            >
            <Text style={styles.spotText}>{spotsInfo.sub_trim_total}个景点</Text>
        </Image>
    }
    return <ScrollView>
        <Image
            style={styles.regionImg}
            source={{uri:regionImg}}
            >
            <Text style={styles.regionName}>{regionName}</Text>
        </Image>
        <Image
            style={styles.guideImg}
            source={{uri:guideImg}}
            >
            <Text style={styles.guideText}>云导游</Text>
        </Image>

        {tmp}

        <View style={styles.spotsSection}>
            {
                spotsInfo.items.map(spot => {
                    return <Spot
                        key={spot._id}
                        navigator={navigator}
                        {...spot}
                        />;
                })
            }
        </View>
    </ScrollView>;
};

class ScenicRegion extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        //this.updateTime = this.updateTime.bind(this);
    }

    fetchRegionInfo(id) {
        // todo
        console.log('fetchRegionInfo: ', id);
        setTimeout(() => {
            this.setState({
                spotsInfo: require('./scenicSpots.js').result
            })
        }, 1000)
    }

    fetchSpotsInfo(id) {
        // todo
        console.log('fetchSpotsInfo: ', id);
        setTimeout(() => {
            this.setState({
                regionInfo: require('./scenicRegion.js').result.result,
            })
        }, 1000)
    }

    componentWillMount() {
        //this.setState({
        //    regionInfo: require('./scenicRegion.js').result.result,
        //    spotsInfo: require('./scenicSpots.js').result
        //})
        console.log('region componentWillMount');
    }

    updateTime(e) {
        this.setState({currentTime: e.target.currentTime})
    }

    componentDidMount() {
        console.log('region componentDidMount');
        // sessionLocalStorage....
        //setInterval(() => {
        //    console.log('scenic region...');
        //}, 1000);
        this.fetchRegionInfo(this.props.id);
        this.fetchSpotsInfo(this.props.id);

        //const {location} = this.props;
        //if (location.state && location.state.currentTime) {
        //    this.setState({
        //        currentTime
        //    });
        //}
        this.setState({
            //currentTime: document.querySelector('audio').currentTime
        });
    }

    componentWillUnmount() {
        console.log('scenic region unmount...');
    }

    render() {
        if (!this.state.spotsInfo || !this.state.regionInfo) {
            return <Text style={{margin: 100}}>Loading.....</Text>;
        }
        return <PureScenicRegion
            regionName={this.state.regionInfo.title}
            regionImg={this.state.regionInfo.cover.source}
            guideImg={this.state.regionInfo.guide_info.cover.source}
            spotsInfo={this.state.spotsInfo.result}
            navigator={this.props.navigator}
            />
    }
}

const styles = StyleSheet.create({
    regionImg: {
        height: 300,
    },
    regionName: {
        fontSize: 20,
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: 'white',
        backgroundColor: 'transparent',
    },
    guideImg: {
        height: 100,
        margin: 10,
    },
    guideText: {
        alignSelf: 'center',
        width: 80,
        height: 40,
        top: 20,
        bottom: 20,
        padding: 10,
        fontSize: 20,
        color: 'white',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
    },
    spotImg: {
        height: 150,
    },
    spotText: {
        width: 80,
        height: 40,
        top: 20,
        left: 20,
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    spotSection: {
        margin: 20,
    },
    spotTitle: {
        fontSize: 15,
        position: 'absolute',
        bottom: 20,
        left: 10,
        color: 'white',
        backgroundColor: 'transparent',
    },
    spotTotal: {
        fontSize: 10,
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: 'white',
        backgroundColor: 'transparent',
    },
    voiceContainer: {},
    voice: {
        margin: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    voiceImage: {
        height: 24,
        width: 24,
        position: 'absolute',
    },
    voiceText: {
        height: 24,
        marginLeft: 35
    }
});

export default ScenicRegion;
