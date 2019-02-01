import React, { Component } from 'react';
import styled from 'styled-components';
import { get, each } from 'lodash';
import { Button } from 'react-bootstrap';
import { FormControl, ControlLabel } from 'react-bootstrap';
import Sound from 'react-sound';

import FormInputRenderer from '../components/FormInputRenderer';
import { idFromString } from '../util';

const StyledFormControl = styled(FormControl)`
  margin-bottom: 15px;
`;

const setUpQuestions = (audioFiles, questions) => {
  const toReturn = {};
  each(questions, (question) => {
    each(audioFiles, (file) => {
      const questionId = `${file.split('.')[0]}.${idFromString(question.question)}`;
      const questionData = {
        type: question.type,
        audioFile: file
      };
      toReturn[questionId] = questionData;
    });
  });
  return toReturn;
};

class RandomAudioActivity extends Component {

  state = {
    audioState: Sound.status.PAUSED,
    questions: setUpQuestions(
      this.props.activity.audioFiles,
      this.props.activity.questions
    ),
    // Activities start on the first question, incomplete
    questionIndex: 0,
    activityComplete: false
  }

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
      <FormInputRenderer
        questions={this.props.activity.questions}
        onValueChange={this.handleValueUpdate}
        values={this.state.questions}
      />
    </div>;
  }
}

export default RandomAudioActivity;
