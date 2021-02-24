import React, { Component } from "react";
import { Button } from 'antd';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';

class AudioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
      allTime: 0,
      currentTime: 0,
    };
  }

  componentDidMount() {}

  onCanPlay = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    this.setState({
      allTime: audio.duration,
    });
  };

  playAudio = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    audio.play();
    this.setState({
      isPlay: true,
    });
  };

  pauseAudio = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    audio.pause();
    this.setState({
      isPlay: false,
    });
  };

  onTimeUpdate = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);

    this.setState({
      currentTime: audio.currentTime,
    });
    if (audio.currentTime === audio.duration) {
      this.setState({
        isPlay: false,
      });
    }
  };

  render() {
    const { src, id } = this.props;

    const {
      isPlay,
    } = this.state;

    return (
      <div>
        <audio
          id={`audio${id}`}
          src={src}
          ref={(audio) => {
            this.audioDom = audio;
          }}
          preload={"auto"}
          onCanPlay={this.onCanPlay}
          onTimeUpdate={this.onTimeUpdate}
        >
        </audio>
        {isPlay ? (
          <Button type="primary" shape="circle" icon={<PauseOutlined />} onClick={this.pauseAudio} size={"large"}/>
        ) : (
          <Button type="primary" shape="circle" icon={<CaretRightOutlined />} onClick={this.playAudio} size={"large"}/>
        )}
      </div>
    );
  }
}

export default AudioButton;
