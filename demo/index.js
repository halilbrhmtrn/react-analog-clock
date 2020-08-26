import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AnalogClock, { Themes } from '../src/index';

const WIDTH = 200;

const customTheme = {
    background: 'transparent',
    border: 'transparent',
    center: 'transparent',
    seconds: '#000',
    minutes: '#000',
    hour: '#000',
    tick: '#000',
    smallTickWidth: 1,
    largeTickWidth: 1,
    secondHandWidth: 1,
    minuteHandWidth: 1,
    hourHandWidth: 1,
};
const values = ["2020-08-27 09:00:00", "2020-08-27 08:45:00", "2020-08-27 04:33:00", "2020-08-27 06:18:00", "2020-08-27 05:23:00","2020-08-27 02:10:00","2020-08-27 04:15:00","2020-08-27 06:29:00","2020-08-27 03:11:00"];

export default class ComponentToRender extends Component {
    constructor(props) {
        super();
        this.state = {
            value: values[0]
        }
    }
    handleClick(e) {
        this.setState({
            value:values[Math.floor(Math.random()*10)],
        })
    }
    render(){
        return (
            <div>
                <span><AnalogClock width={WIDTH} theme={Themes.light} /></span>
                <span><AnalogClock width={WIDTH} theme={Themes.dark} /></span>
                <span><AnalogClock width={WIDTH} theme={Themes.aqua} /></span>
                <span><AnalogClock width={WIDTH} theme={Themes.lime} /></span>
                <span><AnalogClock width={WIDTH} theme={Themes.sherbert} /></span>
                <span><AnalogClock width={WIDTH} theme={Themes.navy} /></span>
                <span><AnalogClock width={WIDTH} theme={Themes.light} /></span>
                <span><AnalogClock value={this.state.value} width={WIDTH} theme={customTheme} showSmallTicks={false} /></span>
                <button onClick={this.handleClick.bind(this)}>Change</button>
            </div>
        );
    }

}

ReactDOM.render(<ComponentToRender/>, document.getElementById('app'));
