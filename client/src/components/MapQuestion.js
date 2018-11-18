import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { PlainText } from '../components/Typography';

const QuestionBox = styled.div`
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #eee;
  padding: 15px 25px;
  max-width: 600px;
`;

const QuestionText = styled(PlainText)`
  margin: auto;
`;

class MapQuestion extends PureComponent {
  render(props) {
    return (
      <QuestionBox className={this.props.className}>
        <QuestionText>
          {this.props.text}
        </QuestionText>
      </QuestionBox>
    );
  }
}

export default MapQuestion;
