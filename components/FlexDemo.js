/**
 * Created by liyan on 16/4/29.
 */
"use strict";

import React from 'react-native'
const {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    PixelRatio,
    } = React;

const FlexDemo = () => {
    const onPressTitle = (e) => {
        console.log('press title', e)
    }
    return <ScrollView>



        <Text style={[styles.text, styles.header]}>
            文本元素
        </Text>

        <View style={{backgroundColor: '#333333', padding: 10}}>
            <Text style={styles.baseText} numberOfLines={3}>
                <Text style={styles.titleText} onPress={onPressTitle}>
                    文本元素{'\n'}
                </Text>
                <Text>
                    {'\n'}In this example, the nested title and body text will inherit the fontFamily from styles.baseText, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines, numberOfLines is Used to truncate the text with an elipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.
                </Text>
            </Text>
        </View>



    </ScrollView>
}

const styles = StyleSheet.create({
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
        textAlign: 'center',
        margin: 10
    },
    cellfixed: {
        height: 50,
        width: 80,
        backgroundColor: '#fefefe'
    },
    circle: {
        backgroundColor: '#fe0000',
        borderRadius: 10,
        width: 20,
        height: 20
    },
    baseText: {
        fontFamily: 'Cochin',
        color: 'white',
        height: 200
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    }

});

export default FlexDemo;
