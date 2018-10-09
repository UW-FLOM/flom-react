import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

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
`;

const IntroText = styled(PlainText)`
  margin-left: 0px;
`;

const SubmitButton = styled(Button)`
  margin: auto;
`;

const MapSection = styled(MapTool)`

`;

class MapActivity extends Component {

  state ={
    answers: {}
  }

  render() {
    console.log('INFO: map state on render:', JSON.stringify(this.state));

    return (
      <ActivityContainer>
        <SideBar>
          <Header>{this.props.activity.title}</Header>
          <IntroText>
            {this.props.activity.helpText}
          </IntroText>
          <SubmitButton
            bsStyle="primary"
            onClick={() => this.props.onSubmit(this.state.answers)}
          >
            Submit
          </SubmitButton>
        </SideBar>
        <MapSection />
      </ActivityContainer>
    );
  }
}

export default MapActivity;
