'use strict';

const React = require('react-native');

const MainListCell = require('./MainListCell');
const CommentList = require('./CommentList');

const {
    StyleSheet,
    Image,
    View,
    Text,
    ScrollView,
    Component
    } = React;

const DetailView = ({property, onSelect}) => {
    return <ScrollView>
        <View>
            <MainListCell
                onSelect={onSelect}
                data={property}
                />
            <View>
                <CommentList
                    data={property}
                    />
            </View>
        </View>
    </ScrollView>
}
export default DetailView;
