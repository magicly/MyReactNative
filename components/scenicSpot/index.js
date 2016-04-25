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

const Voice = ({id, title, img, author, navigator}) => {
    const toVoice = () => {
        navigator.push({name: 'Voice', id:id});
    }
    return <TouchableOpacity
        style={styles.voice}
        key={id}
        onPress={toVoice}
        >
        <Image style={styles.voiceImage}
               source={{uri: img}}
            />
        <Text style={styles.voiceText}>
            {title}
        </Text>

        <Text style={styles.voiceAuthor}>
            by {author}
        </Text>
    </TouchableOpacity>
}
const PureScenicSpot = ({title, img, total, voices, navigator}) => {
    return <ScrollView>
        <Image style={styles.img}
               source={{uri:img}}
            >
            <Text style={styles.title}>{title}</Text>
        </Image>

        <Text style={styles.totalStory}>{total}个故事</Text>
        {voices.map(voice => {
            return <Voice
                key={voice._id}
                id={voice._id}
                title={voice.title}
                img={voice.cover.source}
                author={voice.user.username}
                navigator={navigator}
                />
        })}
    </ScrollView>
}
class ScenicSpot extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    fetchSpotInfo(id) {
        setTimeout(() => {
            const scenicInfo = require('./scenicInfo.js').result.result;
            const voices = require('./scenicVoice').result.result;
            this.setState({
                scenicInfo,
                voices
            });
        }, 1000)
    }

    componentDidMount() {
        this.fetchSpotInfo(this.props.id);
    }

    componentWillUnmount() {
    }

    render() {
        if (!this.state.scenicInfo || !this.state.voices) {
            return <Text style={styles.loading}>
                Loading...
            </Text>
        }
        return <PureScenicSpot
            title={this.state.scenicInfo.title}
            img={this.state.scenicInfo.cover.source}
            total={this.state.voices.total}
            voices={this.state.voices.items}
            currentTime={this.state.currentTime}
            navigator={this.props.navigator}
            />
    }
}

const styles = StyleSheet.create({
    loading: {
        margin: 100,
    },
    img: {
        height: 200,
    },
    title: {
        fontSize: 20,
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: 'white',
        backgroundColor: 'transparent',
    },
    totalStory: {
        fontSize: 15,
        color: 'gray',
        margin: 10,
    },
    voice: {
        marginLeft: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    voiceImage: {
        height: 40,
        width: 40,
        position: 'absolute',
    },
    voiceText: {
        height: 24,
        marginLeft: 45
    },
    voiceAuthor: {
        height: 24,
        marginLeft: 45
    },
});

export default ScenicSpot;
