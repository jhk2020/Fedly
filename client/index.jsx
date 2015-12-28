import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Clock from './components/clock';
import News from './components/news';
import './styles/app.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      opacity: 0
    }
  }
  overlay() {
    return {
      opacity: this.state.opacity
    }
  }

  clockOpacity() {
    let opacity = 1 - (this.state.opacity) * 1.5;
    return {
      opacity: opacity
    }
  }

  scrollHandler() {
    let scrollTop = $(window).scrollTop();
    let offset = $('#container').offset().top;
    let opacity = 1 - (offset - scrollTop) / offset;
    if (opacity >= 1) {
      this.setState({opacity: 1});
    } else {
      this.setState({opacity: opacity});
    }
  }

  render() {
    return (
      <div>
        <div id='overlay' style={this.overlay()}>
        </div>
        <div style={this.clockOpacity()}>
          <Clock />
        </div>
        <News />
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler.bind(this));
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
