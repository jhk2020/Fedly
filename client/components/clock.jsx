import React, { Component } from 'react';
import Firebase from 'firebase';

export default class Clock extends Component {
  constructor () {
    super();
    this.state = {
      clock: '',
      saying: ''
    }
  }

  componentWillMount () {
    const refreshClock = () => {
      let currentTime = new Date();

  		//assign ind. variable for hours, mins, secs
  		let currentHour = currentTime.getHours();
  		let currentMinute = currentTime.getMinutes();

  		// determine AM or PM
  		let timeOfDay = currentHour > 11 ? "PM" : "AM";

  		//change to 12-hour-day format
  		currentHour = currentHour > 12 ? currentHour - 12 : currentHour;

  		// adding '0' as padding
  		currentHour = currentHour < 10 ? '0' + currentHour : currentHour;
  		currentMinute = currentMinute < 10 ? '0' + currentMinute : currentMinute;
      this.setState({clock: currentHour + ':' + currentMinute + " " + timeOfDay})
    }
    refreshClock();
    setInterval(refreshClock, 1000);
  }

  handleChange(event) {
    this.setState({saying: event.target.value});
  }

  render () {
    return (
      <div>
        <div id='clock'>
          {this.state.clock}
        </div>
        <div id='sayingContainer'>
          <textarea id='saying' rows='3' value={this.state.saying} onChange={this.handleChange.bind(this)} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const ref = new Firebase('https://fedly.firebaseio.com/');
    ref.once('value', (snapshot) => {
      this.setState({saying: snapshot.val().saying});
    });

    $('#saying').keydown((event) => {
      if (event.ctrlKey && event.keyCode == '13') {
        event.preventDefault();
        debugger;
        $('#saying').blur();
        ref.update({'saying': this.state.saying});
      }
    })
  }

};
