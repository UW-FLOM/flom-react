import React, { Component } from "react";
import { Button } from 'antd';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';

class AudioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
      isMuted: false,
      volume: 100,
      allTime: 0,
      currentTime: 0,
    };
  }

  componentDidMount() {}

  formatSecond(time) {
    const second = Math.floor(time % 60);
    let minite = Math.floor(time / 60);
    return `${minite}:${second >= 10 ? second : `0${second}`}`;
  }

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

  // 当前播放位置改变时执行
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

  changeVolume = (e) => {
    const { value } = e.target;
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    audio.volume = value / 100;

    this.setState({
      volume: value,
      isMuted: !value,
    });
  };

  render() {
    const { src, id } = this.props;

    const {
      isPlay,
      isMuted,
      volume,
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

        <div>
          <span>音量调节：</span>
          <input
            type="range"
            onChange={this.changeVolume}
            value={isMuted ? 0 : volume}
          />
        </div>
      </div>
    );
  }
}

export default AudioButton;