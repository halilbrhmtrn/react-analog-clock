import React from 'react';
import PropTypes from 'prop-types';

function renderNotches({ smallTick, largeTick }, showSmallTicks) {
    const notches = [];
    for (let i = 0; i < 60; i++) {
        let style = Object.assign({}, i % 5 === 0 ? largeTick : smallTick, {
            transform: `translateX(-50%) translateY(-100%) rotate(${i * 6}deg)`,
        });
        if (i % 5 !== 0 && !showSmallTicks) continue;
        notches.push(<span key={i} style={style} />);
    }
    return notches;
}

export default function AnalogClockLayout({ hour, minutes, seconds, styles, showSmallTicks, enableSeconds }) {
    // +1 to center align
    const secondStyle = Object.assign({}, styles.second, {
        transform: `translateX(-50%) translateY(-100%) rotate(${seconds * 6 + 1}deg)`,
    });
    // +1 to center align
    const minuteStyle = Object.assign({}, styles.minute, {
        transform: `translateX(-50%) translateY(-100%) rotate(${minutes * 6 + 1}deg)`,
    });
    // +1.5 to center align
    const hourStyle = Object.assign({}, styles.hour, {
        transform: `translateX(-50%) translateY(-100%) rotate(${hour % 12 * 30 + 1.5}deg)`,
    });
    const renderSeconds = enableSeconds ? <div data-testid="seconds" style={secondStyle}></div> : null;

    return (
        <div style={styles.base}>
            {renderSeconds}
            <div data-testid="minutes" style={minuteStyle}></div>
            <div data-testid="hour" style={hourStyle}></div>
            <div style={styles.center}></div>
            {renderNotches(styles, showSmallTicks)}
        </div>
    );
}

AnalogClockLayout.propTypes = {
    hour: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    styles: PropTypes.shape({
        second: PropTypes.object.isRequired,
        minute: PropTypes.object.isRequired,
        hour: PropTypes.object.isRequired,
    }).isRequired,
    showSmallTicks: PropTypes.bool.isRequired,
    enableSeconds: PropTypes.bool.isRequired,
};
