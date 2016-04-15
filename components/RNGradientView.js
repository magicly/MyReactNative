import React, { requireNativeComponent, processColor } from 'react-native';

const RNLinearGradient = requireNativeComponent('RNLinearGradientSwift');
class LinearGradient extends React.Component {
    render() {
        let { colors, ...otherProps } = this.props;
        return <RNLinearGradient {...otherProps} colors={processColor(colors)}/>;
    }
}
LinearGradient.propTypes = {
    colors: React.PropTypes.array.isRequired,
    //locations: React.PropTypes.array,
}
export default LinearGradient;