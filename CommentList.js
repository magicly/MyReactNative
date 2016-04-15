'use strict';

const React = require('react-native');
const {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    ListView,
    Text,
    Component
    } = React;

import CommentListCell from './CommentListCell';
import MainListCell from './MainListCell';

export default class CommentList extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            loaded: false,
            dataSource: dataSource
        };
    }

    componentDidMount() {
        const commentUrl = 'http://www.qiushibaike.com/commentpage/' + this.props.data.id + '?page=1'
        console.log(commentUrl)
        fetch(commentUrl)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.comments.items),
                    loaded: true,
                });
            })
            .catch((error) => {
                alert('error')
                console.warn(error);
            });
    }


    renderForRow(rowData, sectionID, rowID) {
        return <CommentListCell data={rowData}/>
    }

    renderContent() {
        return <MainListCell
            data={this.props.data}
            />
    }

    render() {
        return <ListView
            renderHeader={this.renderContent.bind(this)}
            dataSource={this.state.dataSource}
            renderRow={this.renderForRow.bind(this)}
            />
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ededed',
        flex: 1,
        flexDirection: 'row',
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
    }
});
