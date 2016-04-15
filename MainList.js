'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    ListView,
    Text,
    Component
    } = React;

import CommentList from './CommentList';
import MainListCell from './MainListCell';
import Refreshing from './Refreshing';

const hotUrl = "http://m2.qiushibaike.com/article/list/suggest?count=20&page="

export default class MainList extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            loaded: false,
            currentPage: 0,
            dataSource: dataSource,
            data: [],
            reloading: false,
        };
    }

    fetchData() {
        this.state.loaded = false
        var url = hotUrl + (this.state.currentPage + 1)
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {

                var length = this.state.data.length

                if (length !== 0 && this.state.data[length - 1].loadingCell == true) {
                    this.state.data.shift()
                }

                var newData = this.state.data.concat(responseData.items)
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(newData),
                    loaded: true,
                    currentPage: this.state.currentPage + 1,
                    data: newData
                });
            })
            .catch((error) => {
                console.warn(error);
            });

    }

    reFetchData() {
        var url = hotUrl + '1'
        this.state.currentPage = 0
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                var newData = responseData.items;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(newData),
                    loaded: true,
                    currentPage: this.state.currentPage + 1,
                    data: newData,
                    reloading: true,
                });
            })
            .catch((error) => {
                console.warn(error);
            });

    }

    componentDidMount() {
        this.fetchData()
    }


    renderForRow(rowData, sectionID, rowID) {
        return <MainListCell
            onSelect={this.toDetail.bind(this)}
            data={rowData}
            />
    }

    renderHeader() {
        return <View>
            <Refreshing>
                {'...'}
            </Refreshing>
        </View>
    }

    handleScroll(e) {
        if (e.nativeEvent.contentOffset.y < -40) {
            this.reFetchData()
        }
    }

    toDetail(data) {
        this.props.navigator.push({
            title: "Detail",
            component: CommentList,
            passProps: {data: data}
        });
    }

    renderFooterLoading() {
        if (this.state.currentPage == 0) return null

        var lastIndex = this.state.data.length - 1
        if (this.state.data[lastIndex].loadingCell == true) {
            return null
        } else {
            var newData = this.state.data.concat({
                loadingCell: true
            })
            this.state.data = newData
            this.state.dataSource = this.state.dataSource.cloneWithRows(newData)
        }
    }

    renderLoading() {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>
                    {'Loading...'}
                </Text>
            </View>
        );
    }

    renderList() {
        return <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderForRow.bind(this)}
            renderFooter={this.renderFooterLoading.bind(this)}
            renderHeader={this.renderHeader.bind(this)}
            onEndReached={this.fetchData.bind(this)}
            onEndReachedThreshold={0}
            onScroll={this.handleScroll.bind(this)}
            />
    }


    render() {
        if (this.state.loaded) {
            return this.renderList()
        } else {
            return this.renderLoading()
        }
    }


}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        color: '#666E74',
        flex: 1
    },
});
