import React from 'react';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/dist/css/react-widgets.css'
import moment from 'moment';
import 'moment-timezone';


moment.locale('ru');
moment().format();
momentLocalizer(moment);

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
    <DateTimePicker
        onChange={onChange}
        time={showTime}
        format={"Do MMMM YYYY, HH:mm"}
        value={!value ? null : new Date(value)}
    />

export default renderDateTimePicker;