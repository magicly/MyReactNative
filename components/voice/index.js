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


const VoiceComments = ({img,user,title,Comments,scenics,comment_total,score,play,state})=> {
    return <Text style={styles.todo}>
        todo....
    </Text>
}

class Voice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: {
                isPlay: false,
                time: 0
            }
        };
    }

    fetchVoiceInfo(id) {
        console.log('voice id:' + id);
        setTimeout(() => {
            const commentsInfo = require('./commentsInfo.js').result.result;
            const voiceInfo = require('./voiceInfo.js').result.result;
            this.setState({
                commentsInfo,
                voiceInfo
            });
        }, 1000)
    }

    render() {
        if (!this.state.voiceInfo || !this.state.commentsInfo) {
            return <Text>loading...</Text>
        }
        return <VoiceComments
            img={this.state.voiceInfo.cover.source}
            user={this.state.voiceInfo.user}
            title={this.state.voiceInfo.title}
            score={this.state.voiceInfo.score}
            comment_total={this.state.voiceInfo.comment_total}
            scenics={this.state.voiceInfo.scenics}
            Comments={this.state.commentsInfo.items}
            play={this.state.play}
            state={this}
            />
    }

    componentDidMount() {
        this.fetchVoiceInfo(this.props.id);
    }

    componentDidUpdate() {
        console.log(this.state.play.isPlay, this.state.play.time)
        let Timer = null;
        if (this.state.play.isPlay) {
            Timer = setTimeout(()=> {
                this.setState({
                    play: {
                        isPlay: this.state.play.isPlay,
                        time: this.state.play.time + 1
                    }
                });
            }, 1000);
            this.showLoading(this.state.play.time)
        } else {
            clearTimeout(Timer)
        }
    }
}

const styles = StyleSheet.create({
    todo: {
        margin: 100
    }
});

export default Voice;
