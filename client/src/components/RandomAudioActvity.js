import React, { Component } from 'react';
import styled from 'styled-components';
import { get, reduce } from 'lodash';
import { Button } from 'react-bootstrap';
import { FormControl, ControlLabel } from 'react-bootstrap';
import Sound from 'react-sound';

import { Header, PlainText } from '../components/Typography';
import { idFromString } from '../util';

const FormLayout = styled.div`
  margin: auto;
  width: 900px;
  padding: 0px 15px;
  height: 100%;
`;

const IntroText = styled(PlainText)`
  margin-left: 0px;
`;

const SubmitButton = styled(Button)`
  margin: auto;
`;

const StyledFormControl = styled(FormControl)`
  margin-bottom: 15px;
`;

class RandomAudioActivity extends Component {

  state ={
    audioState: Sound.status.PAUSED
  }

  // state = {
  //   questions: reduce(this.props.activity.questions, (result, value, key) => {
  //     const questionData = {
  //       type: value.type,
  //       indexInActivity: key
  //     };
  //     const questionId = idFromString(value.question);
  //     if (value.type === 'text'){
  //       questionData['response'] = '';
  //     }
  //     if (value.type === 'select'){
  //       questionData['response'] = get(value, 'options[0]', '');
  //     }
  //     return {
  //       ...result,
  //       [questionId]: questionData
  //     };
  //   },{})
  // }

  // handleValueUpdate = (questionId, questionData) => {
  //   this.setState((previousState) => {
  //     return {
  //       ...previousState,
  //       questions: {
  //         ...previousState.questions,
  //         [questionId]: {
  //           ...questionData
  //         },
  //       },
  //     };
  //   });
  // }

  playAudio = () => {
    this.setState({
      audioState: Sound.status.PLAYING
    });
  }

  render() {
    console.log('INFO: form state on render:', JSON.stringify(this.state));

    return <div>
      <h1>Llama</h1>
      <Button
       onClick={this.playAudio}
      >
        Make a horrible Llama sound
      </Button>
      <Sound
        url="http://urlserveurs.free.fr/sound/misc/ooorgle.wav"
        playStatus={this.state.audioState}
      />

    </div>;
  }
}

export default RandomAudioActivity;
