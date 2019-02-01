import React, { Component } from 'react';
import styled from 'styled-components';
import { get, reduce, each } from 'lodash';
import { Button } from 'react-bootstrap';
import { FormControl, ControlLabel } from 'react-bootstrap';
import Sound from 'react-sound';

import { Header, PlainText } from '../components/Typography';
import { idFromString } from '../util';

const IntroText = styled(PlainText)`
  margin-left: 0px;
`;

const SubmitButton = styled(Button)`
  margin: auto;
`;

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
      {
        this.props.activity.questions.map((question, idx) => {
            const questionId = idFromString(question.question);
            if (question.type === 'text') {
              return (
                <div key={idx}>
                  <ControlLabel>{question.question}</ControlLabel>
                  <StyledFormControl
                    type="text"
                    value={get(this.state, `questions[${questionId}].response`) || ""}
                    // onChange={
                    //   (event) => this.handleValueUpdate(
                    //     questionId,
                    //     {
                    //       indexInActivity: idx,
                    //       type: "text",
                    //       response: event.target.value
                    //     }
                    //   )
                    // }
                    />
                </div>
              );
            } else if (question.type === 'select') {
              return (
                <div key={idx}>
                  <ControlLabel>{question.question}</ControlLabel>
                  <StyledFormControl
                    componentClass="select"
                    type="select"
                    value={
                      get(this.state, `questions[${questionId}].response`, '')
                    }
                    // onChange={
                    //   (event) => this.handleValueUpdate(
                    //     questionId,
                    //     {
                    //       indexInActivity: idx,
                    //       type: "select",
                    //       response: event.target.value
                    //     }
                    //   )
                    // }
                  >
                    {question.options.map((option, idx) => {
                      return (
                        <option
                          key={idx}
                          value={idFromString(option)}
                        >
                          {option}
                        </option>
                      );
                    })}
                  </StyledFormControl>
                </div>
              );
            }
            return <p key={idx}>{JSON.stringify(question)}</p>;
          })
        }

    </div>;
  }
}

export default RandomAudioActivity;
