import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { map } from 'lodash';

import { Header, PlainText } from '../components/Typography';
import MapTool from '../components/MapTool';

const ActivityContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  width: 100vw;
  height: 100vh;
`;

const SideBar = styled.div`
  padding: 15px;
  border-right: 1px solid #ccc;
`;

const IntroText = styled(PlainText)`
  margin-left: 0px;
`;

const SubmitButton = styled(Button)`
  margin: auto;
`;


class MapActivity extends Component {

  state ={
    questions: {},
    polys: []
  }

  onRegionDrawn = (latLngs) => {
    this.setState((previousState) => {
      return {
        ...previousState,
        polys: [
          ...previousState.polys,
          latLngs
        ]
      };
    });
  }

  render() {
    return (
      <ActivityContainer>
        <SideBar>
          <Header>{this.props.activity.title}</Header>
          <IntroText>
            {this.props.activity.helpText}
          </IntroText>
          {
            map(this.props.activity.questions, (question, idx) => {
              return (
                <PlainText key={idx}>{question.question}</PlainText>
              );
            })
          }
          <SubmitButton
            bsStyle="primary"
            onClick={() => this.props.onSubmit(this.state)}
          >
            Submit
          </SubmitButton>
        </SideBar>
        <MapTool
          center={this.props.activity.center}
          zoomLevel={this.props.activity.zoomLevel}
          onRegionDrawn={this.onRegionDrawn}
          polygons={this.state.polys}
        />
      </ActivityContainer>
    );
  }
}

export default MapActivity;
