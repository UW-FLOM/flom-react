import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import { Header, PlainText } from '../components/Typography';

const IntroText = styled(PlainText)`
  margin-left: 10px;
`;

const ConsentButton = styled(Button)`
  margin: auto;
`;

class Intro extends PureComponent {
  render() {
    return (
      <div>
        <Header>{this.props.title}</Header>
        <IntroText>
          {this.props.intro}
        </IntroText>
        <ConsentButton onClick={this.props.onBeginClick} variant="primary">
          {this.props.startButtonText || "Begin"}
        </ConsentButton>
      </div>
    );
  }
}

export default Intro;
