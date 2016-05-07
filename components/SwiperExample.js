var Swiper = require('react-native-swiper')
// es6
// import Swiper from 'react-native-swiper'

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    } = React;

var styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})

const SwiperExample = () => {
    return (
        <Swiper
            showsButtons={true}
            autoplay={true}
            style={styles.wrapper}
            >
            <View style={styles.slide1}>
                <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
                <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
                <Text style={styles.text}>And simple</Text>
            </View>
        </Swiper>
    )
}

export default SwiperExample;

