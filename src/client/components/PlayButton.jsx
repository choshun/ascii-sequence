import React, { Component } from 'react';
import classNames from 'classnames';
import { setPlay } from '../actions';

class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    var playing = !this.props.transport.get('play');
    this.props.dispatch(setPlay(playing));
  }

  render() {
    return (
      <button className={ 'play-button' } onClick={ this.togglePlay }>
        play button yo
      </button>
    );
  }
}

export default PlayButton;