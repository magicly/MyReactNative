/**
 * Created by liyan on 16/3/16.
 */
const React = require('react-native');
const {
    requireNativeComponent
    } = React;


const MyMap = requireNativeComponent('MyMap', MyMapView);
class MyMapView extends React.Component {
    static propTypes = {
        pitchEnabled: React.PropTypes.bool,
    };

    render() {
        return <MyMap {...this.props} />;
    }
}

export default MyMapView;
