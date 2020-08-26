import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AnalogClockLayout from './AnalogClockLayout';
import Styles from './styles';
import { cssTransform, updateTime } from './util';
import { dark } from './themes';

export default class AnalogClock extends Component {

    constructor(props) {
        super();
        const { value } = props;
        const date = this.initializeTime(/*props.gmtOffset*/);
        this.state = {
            seconds: date[2],
            minutes: date[1],
            hour: date[0],
            value,
        };

        this.styles = cssTransform(Styles, props);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(updateTime(this.state));
        }, 1000);
    }

    componentWillReceiveProps(nextProps) {
        this.styles = cssTransform(Styles, nextProps);
        if (nextProps.value !== this.state.value) {
            const date = this.initializeTime();
            this.setState({
                seconds: date[2],
                minutes: date[1],
                hour: date[0],
                value: nextProps.value,
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    /* We don't need gmtOffset feature so i get rid of it for the sake of simplicity */
    initializeTime(/* gmtOffset*/) {
        const now = new Date();
        let value = this.state ? this.state.value : undefined;
        if (value && typeof (value) === 'string') {
            value = new Date(value);
            return [value.getHours(), value.getMinutes(), value.getSeconds()];
        } else {
            return [now.getHours(), now.getMinutes(), now.getSeconds()];
        }
            /* if (gmtOffset && gmtOffset !== 'undefined') {
                const offsetNow = new Date(now.valueOf() + (parseFloat(gmtOffset) * 1000 * 60 * 60));
                return [offsetNow.getUTCHours(), offsetNow.getUTCMinutes(), offsetNow.getUTCSeconds()];
            }*/
    }

    render() {
        return <AnalogClockLayout {...this.state} styles={this.styles} showSmallTicks={this.props.showSmallTicks} />;
    }
}

AnalogClock.propTypes = {
    theme: PropTypes.shape({
        background: PropTypes.string.isRequired,
        border: PropTypes.string.isRequired,
        center: PropTypes.string.isRequired,
        seconds: PropTypes.string.isRequired,
        minutes: PropTypes.string.isRequired,
        hour: PropTypes.string.isRequired,
        tick: PropTypes.string.isRequired,
    }),
    width: PropTypes.number,
    /* gmtOffset: PropTypes.string,*/
    showSmallTicks: PropTypes.bool,
    value: PropTypes.any,
};

AnalogClock.defaultProps = {
    theme: dark,
    width: 400,
    showSmallTicks: true,
};
