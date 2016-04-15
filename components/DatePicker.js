'use strict';

var React = require('react-native');
var {
    DatePickerIOS,
    StyleSheet,
    Text,
    TextInput,
    View,
    } = React;

export const DatePickerExample = React.createClass({
        getDefaultProps: function () {
            return {
                date: new Date(),
                timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
            };
        },

        getInitialState: function () {
            return {
                date: this.props.date,
                timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
            };
        },

        onDateChange: function (date) {
            this.setState({date: date});
        },

        onTimezoneChange: function (event) {
            var offset = parseInt(event.nativeEvent.text, 10);
            if (isNaN(offset)) {
                return;
            }
            this.setState({timeZoneOffsetInHours: offset});
        },

        render: function () {
            const dateTimeStr = this.state.date.toLocaleDateString() + ' ' + this.state.date.toLocaleTimeString();
            return <DatePicker
                dateTimestr={dateTimeStr}
                onTimezoneChange={this.onTimezoneChange}
                timeZoneOffsetInHours={this.state.timeZoneOffsetInHours }
                date={this.state.date}
                onDateChange={this.onDateChange}
                />;
        }
    }
);


const DatePicker = ({dateTimeStr, onTimezoneChange, timeZoneOffsetInHours, date, onDateChange  }) => {
    alert(timeZoneOffsetInHours)
    return <View>
        <WithLabel label="Value:">
            <Text>{dateTimeStr }</Text>
        </WithLabel>
        <WithLabel label="Timezone:">
            <TextInput
                onChange={onTimezoneChange}
                style={styles.textinput}
                value={timeZoneOffsetInHours}
                />
            <Text> hours from UTC</Text>
        </WithLabel>
        <Heading label="Date + time picker"/>
        <DatePickerIOS
            date={date}
            mode="datetime"
            timeZoneOffsetInMinutes={timeZoneOffsetInHours * 60}
            onDateChange={onDateChange}
            />
        <Heading label="Date picker"/>
        <DatePickerIOS
            date={date}
            mode="date"
            timeZoneOffsetInMinutes={timeZoneOffsetInHours * 60}
            onDateChange={onDateChange}
            />
        <Heading label="Time picker, 10-minute interval"/>
        <DatePickerIOS
            date={date}
            mode="time"
            timeZoneOffsetInMinutes={timeZoneOffsetInHours * 60}
            onDateChange={onDateChange}
            minuteInterval={10}
            />
    </View>
};

const WithLabel = ({label, children}) => {
    return <View style={styles.labelContainer}>
        <View style={styles.labelView}>
            <Text style={styles.label}>
                {label}
            </Text>
        </View>
        {children}
    </View>
}

const Heading = ({label}) => {
    return <View style={styles.headingContainer}>
        <Text style={styles.heading}>
            {label}
        </Text>
    </View>
}

var styles = StyleSheet.create({
    textinput: {
        height: 26,
        width: 50,
        borderWidth: 0.5,
        borderColor: '#0f0f0f',
        padding: 4,
        fontSize: 13,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    labelView: {
        marginRight: 10,
        paddingVertical: 2,
    },
    label: {
        fontWeight: '500',
    },
    headingContainer: {
        padding: 4,
        backgroundColor: '#f6f7f8',
    },
    heading: {
        fontWeight: '500',
        fontSize: 14,
    },
});
