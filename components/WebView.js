/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    WebView
    } = React;

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'http://baidu.com';

export var WebViewExample = React.createClass({

    getInitialState: function () {
        return {
            source: {uri: DEFAULT_URL},
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: false,
        };
    },

    inputText: '',

    handleTextInputChange: function (event) {
        var url = event.nativeEvent.text;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }
        this.inputText = url;
        //alert('change' + url)
    },

    render: function () {
        //alert('status' + this.state.status)
        return (
            <View style={[styles.container]}>
                <View style={[styles.addressBarRow]}>
                    <TouchableOpacity
                        onPress={this.goBack}
                        style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
                        <Text>
                            {'<'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.goForward}
                        style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
                        <Text>
                            {'>'}
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        ref={TEXT_INPUT_REF}
                        autoCapitalize="none"
                        defaultValue={this.state.source.uri}
                        onSubmitEditing={this.onSubmitEditing}
                        onChange={this.handleTextInputChange}
                        clearButtonMode="while-editing"
                        style={styles.addressBarTextInput}
                        />
                    <TouchableOpacity onPress={this.pressGoButton}>
                        <View style={styles.goButton}>
                            <Text>
                                Go!
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <WebViewDemo
                    ref={WEBVIEW_REF}
                    url={this.state.source.uri}
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    scalesPageToFit={this.state.scalesPageToFit}
                    rerender={this.state.rerender}
                    />
                <View style={styles.statusBar}>
                    <Text style={styles.statusBarText}>{this.state.status}</Text>
                </View>
            </View>
        );
    },

    goBack: function () {
        this.refs[WEBVIEW_REF].refs[WEBVIEW_REF].goBack();
    },

    goForward: function () {
        this.refs[WEBVIEW_REF].refs[WEBVIEW_REF].goForward();
    },

    reload: function () {
        this.refs[WEBVIEW_REF].refs[WEBVIEW_REF].reload();
    },

    onShouldStartLoadWithRequest: function (event) {
        // Implement any custom loading logic here, don't forget to return!
        return true;
    },

    onNavigationStateChange: function (navState) {
        //alert(navState.url)
        const state = {
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            source: {uri: navState.url},
            status: navState.title,
            loading: navState.loading,
            scalesPageToFit: false,
            rerender: false
        };
        //if (navState.url !== this.state.source.uri) {
        //    //alert(navState.url + ' ' + this.state.source.uri)
        //    state.source = {uri: navState.url};
        //}
        //alert(JSON.stringify(state));
        this.setState(state);
    },

    onSubmitEditing: function (event) {
        this.pressGoButton();
    },

    pressGoButton: function () {
        if (this.inputText === '') {
        }
        //this.inputText = this.state.source.uri;
        var url = this.inputText.toLowerCase();
        //alert('go' + url)
        if (url === this.state.source.uri) {
            alert('reload')
            this.reload();
        } else {
            this.setState({
                source: {uri: url},
                rerender: true,
            });
        }
        // dismiss keyboard
        this.refs[TEXT_INPUT_REF].blur();
    },

});

class WebViewDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inited: true};
    }

    componentDidMount() {
        //alert('webview did mount')
    }
    componentWillUnMount() {
        alert('will unmount')
    }

    shouldComponentUpdate(props) {
        //alert('shouldUpdateReactComponent' + !this.state);
        //alert(!this.state.inited || props.rerender);
        return false;
        return !this.state.inited || props.rerender;
        //return false;
    }

    goBack() {
        this.refs[WEBVIEW_REF].goBack();
    }

    goForward() {
        this.refs[WEBVIEW_REF].goForward();
    }

    reload() {
        this.refs[WEBVIEW_REF].reload();
    }

    onLoadStart() {
        //alert('this.onLoadStart');
    }
    onLoadEnd() {
        //alert('this.onLoadEnd');
    }
    onLoad() {
        //alert('this.onLoad');
    }
    onError() {
        //alert('this.onError');
    }

    render() {
        const {url, onNavigationStateChange, onShouldStartLoadWithRequest, scalesPageToFit, status} = this.props;
        //alert('render' + JSON.stringify(this.props));
        return <WebView
            ref={WEBVIEW_REF}
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
            source={{uri: url, method: 'GET'}}
            onLoadStart={this.onLoadStart}
            onLoadEnd={this.onLoadEnd}
            onLoad={this.onLoad}
            onError={this.onError}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            onNavigationStateChange={onNavigationStateChange}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            startInLoadingState={true}
            scalesPageToFit={scalesPageToFit}
            allowsInlineMediaPlayback={true}
            />
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: HEADER,
    },
    addressBarRow: {
        flexDirection: 'row',
        padding: 8,
    },
    webView: {
        backgroundColor: BGWASH,
        height: 350,
    },
    addressBarTextInput: {
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        borderWidth: 1,
        height: 24,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        flex: 1,
        fontSize: 14,
    },
    navButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    disabledButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DISABLED_WASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    goButton: {
        height: 24,
        padding: 3,
        marginLeft: 8,
        alignItems: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        alignSelf: 'stretch',
    },
    statusBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        height: 22,
    },
    statusBarText: {
        color: 'white',
        fontSize: 13,
    },
    spinner: {
        width: 20,
        marginRight: 6,
    },
});

//
//exports.displayName = (undefined: ? string ) ;
//exports.title = '<WebView>';
//exports.description = 'Base component to display web content';
//exports.examples = [
//    {
//        title: 'Simple Browser',
//        render(): ReactElement {
//            return <WebViewExample />;
//        }
//    },
//    {
//        title: 'POST Test',
//        render(): ReactElement {
//            return (
//                <WebView
//                    style={{
//            backgroundColor: BGWASH,
//            height: 100,
//          }}
//                    source={{
//            uri: 'http://www.posttestserver.com/post.php',
//            method: 'POST',
//            body: 'foo=bar&bar=foo'
//          }}
//                    scalesPageToFit={false}
//                    />
//            );
//        }
//    }
//];
