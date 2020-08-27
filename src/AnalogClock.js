/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
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
        const date = this.initializeTime(value);
        this.state = {
            seconds: date[2],
            minutes: date[1],
            hour: date[0],
        };

        this.styles = cssTransform(Styles, props);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(updateTime(this.state));
        }, 1000);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.styles = cssTransform(Styles, nextProps);
        if (nextProps.value !== this.props.value) {
            const date = this.initializeTime(nextProps.value);
            this.setState({
                seconds: date[2],
                minutes: date[1],
                hour: date[0],
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    /* We don't need gmtOffset feature so i get rid of it for the sake of simplicity */
    initializeTime(value) {
        const now = new Date();
        if (value) {
            if (typeof (value) === 'string') {
                value = new Date(value);
            }
            return [value.getHours(), value.getMinutes(), value.getSeconds()];
        } else {
            return [now.getHours(), now.getMinutes(), now.getSeconds()];
        }
    }

    render() {
        return <AnalogClockLayout {...this.state} styles={this.styles} showSmallTicks={this.props.showSmallTicks} enableSeconds={this.props.enableSeconds} />;
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
    enableSeconds: PropTypes.bool,
};

AnalogClock.defaultProps = {
    theme: dark,
    width: 400,
    showSmallTicks: true,
    enableSeconds: false,
};
