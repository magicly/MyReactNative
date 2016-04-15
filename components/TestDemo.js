/**
 * Created by liyan on 16/2/23.
 */


var React = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    AlertIOS,
    ScrollView,
    Image,
    } = React;

export const TestDemo = () => {
    return <View>

        <View style={styles.flexContainer}>
            <View style={styles.cell}>
                <Text style={styles.welcome}>
                    cell1
                </Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.welcome}>
                    cell2
                </Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.welcome}>
                    cell3
                </Text>
            </View>
        </View>



        <Text style={[styles.text, styles.header]}>
            嵌套的网格
        </Text>
        <View style={{flexDirection: 'row', height: 200, backgroundColor:"#fefefe", padding: 20}}>
            <View style={{flex: 1, flexDirection:'column', padding: 15, backgroundColor:"#eeeeee"}}>
                <View style={{flex: 1, backgroundColor:"#bbaaaa"}}>
                </View>
                <View style={{flex: 2, backgroundColor:"#aabbaa"}}>
                </View>
            </View>
            <View style={{flex: 2, padding: 15, flexDirection:'row', backgroundColor:"#eeeeee"}}>
                <View style={{flex: 1, backgroundColor:"#aaaabb", borderWidth: 1, borderColor: 'red'}}>
                    <View style={{flex: 1, flexDirection:'row', backgroundColor:"#eeaaaa"}}>
                        <View style={{flex: 1, backgroundColor:"red"}}>
                        </View>
                        <View style={{flex: 1, backgroundColor:"green"}}>
                        </View>
                    </View>
                    <View style={{flex: 1, backgroundColor:"black"}}>
                    </View>
                </View>
                <View style={{flex: 1, backgroundColor:"black"}}>
                    <ScrollView style={{flex: 1, backgroundColor:"#bbccdd", padding: 5}}>
                        <View style={{flexDirection: 'row', height: 50, backgroundColor:"black"}}>
                            <View style={{flex: 1, flexDirection:'column', backgroundColor:"black"}}>
                                <View style={{flex: 1, backgroundColor:"red"}}>
                                </View>
                                <View style={{flex: 1, backgroundColor:"purple"}}>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection:'row', backgroundColor:"#eeeeee"}}>
                                <View style={{flex: 1, backgroundColor:"#aaaabb"}}>
                                    <View style={{flex: 1, flexDirection:'row', backgroundColor:"#eeaaaa"}}>
                                        <View style={{flex: 1, backgroundColor:"blue"}}>
                                        </View>
                                        <View style={{flex: 2, backgroundColor:"yellow"}}>
                                        </View>
                                    </View>
                                    <View style={{flex: 3, backgroundColor:"green"}}>
                                    </View>
                                </View>
                                <View style={{flex: 1, backgroundColor:"red"}}>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.text, styles.header, {color: '#ffffff', fontSize: 12}]}>
                            {(function(){
                                var str = '';
                                var n = 100;
                                while(n--) {
                                    str += '嵌套的网格' + '\n';
                                }
                                return str;
                            })()}
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </View>


        <Text style={[styles.text, styles.header]}>
            在正常的View上设置padding
        </Text>

        <View style={{ backgroundColor: '#333333'}}>
            <Text style={[styles.text, {color: '#fefefe'}]}> Text Element</Text>
        </View>

        <Text style={[styles.text, styles.header]}>
            在文本元素上设置padding
        </Text>
        <Text style={{padding: 0, backgroundColor: '#333333'}}>
            <Text style={[styles.text, {backgroundColor: '#fe0000', padding: 30}]}>
                text 元素上设置paddinga
            </Text>
        </Text>

        <Text style={styles.welcome}> 100px height with resizeMode cover </Text>
        <View style={[{flex: 1, backgroundColor: '#fe0000'}]}>
            <Image style={{flex: 1, height: 100, width: 200}} source={{uri: 'http://gtms03.alicdn.com/tps/i3/TB1Kcs5GXXXXXbMXVXXutsrNFXX-608-370.png'}} />
        </View>


        <Text style={[styles.text, styles.header]}>
            文本元素
        </Text>

        <View style={{backgroundColor: '#333333', padding: 10}}>
            <Text style={styles.baseText}>
                <Text style={styles.titleText} onPress={() => { alert('press this.onPressTitle') }}>
                    文本元素{'\n'}
                </Text>
                <Text numberOfLines={5}>
                    {'\n'}In this example, the nested title and body text will inherit the fontFamily from styles.baseText, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines, numberOfLines is Used to truncate the text with an elipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                    I am bold
                    <Text style={{color: 'red'}}>
                        and red
                    </Text>
                </Text>

            </Text>
        </View>


        <Text style={[styles.text, styles.header]}>
            文本样式继承
        </Text>

        <View style={{backgroundColor: '#333333', padding: 10}}>
            <Text style={{color: 'white'}}>
                <Text style={{color: 'red'}} onPress={this.onPressTitle}>
                    文本元素{'\n'}
                    <Text>我是white还是red呢？{'\n'} </Text>
                </Text>
                <Text>我应该是white的</Text>
            </Text>
        </View>


    </View>
};

const styles = StyleSheet.create({
    text: {},
    header: {},
    flexContainer: {
        // 容器需要添加direction才能变成让子元素flex
        flexDirection: 'row'
    },
    cell: {
        flex: 1,
        height: 50,
        backgroundColor: '#aaaaaa'
    },
    welcome: {
        fontSize: 20,
        borderColor: 'red',
        borderWidth: 1,
        textAlign: 'center',
        margin: 10
    },
    circle: {
        backgroundColor: '#fe0000',
        borderRadius: 10,
        width: 20,
        height: 20
    },
    baseText: {
        fontFamily: 'Cochin',
        color: 'white'
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});



